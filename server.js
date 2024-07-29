import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { serveStatic } from '@hono/node-server/serve-static';
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { parse } from 'es-module-lexer';
import { relative, join } from 'node:path';
import { renderToString } from "react-dom/server";

const app = new Hono();

const clientComponentMap = {};

/**
 * Endpoint to serve your index route.
 * Includes the loader `/build/_client.js` to request your server component
 * and stream results into `<div id="root">`
 */

app.get('/', async (c) => {
	return c.redirect('/Home.js');
});

/**
 * Endpoint to render your server component to a stream.
 * This uses `react-server-dom-webpack` to parse React elements
 * into encoded virtual DOM elements for the client to read.
 */
app.get('/rsc', async (c) => {
	// Note This will raise a type error until you build with `npm run dev`
	const Page = await import('./build/page.js');
	// @ts-ignore
	const Comp = createElement(Page.default);

	const stream = ReactServerDom.renderToReadableStream(Comp, clientComponentMap);
	return new Response(stream);
});

app.get('/:page', async (c) => {
	const { page } = c.req.param();
	const appSSRModule = await import(join(process.cwd(), 'build', 'AppSSR.js'));
	const AppSSR = appSSRModule.default;

	const filePath = join(process.cwd(), 'app', page.replace(/\.js$/, '.tsx'));
	if (await isClientComponent(filePath)) {
		console.log("Rendering Client Component");
		// Render static shell for client components and pass the page variable to the client script
		const html = renderToString(
			createElement(AppSSR, { bootStrapCSS: bootstrapCSS })
		) + `
    <script>
      window.__pageComponentPath = '/app/${page}';
    </script>
    <script src="/build/_clientComp.js" type="module"></script>`;

		return c.html(html);
	}
	console.log("Rendering Server Component");
	const mod = await import(join(process.cwd(), 'build', page));
	const Page = mod.default;

	const reactTree = await createReactTree(
		createElement(AppSSR, { bootStrapCSS: bootstrapCSS },
			createElement(Page, { ...c.req.query() })
		)
	);

	if (c.req.query('jsx') === '') {
		// @ts-ignore
		return c.json(reactTree, 200, escapeJsx);
	}

	const html = `${renderToString(reactTree)}
  <script> window.__initialMarkup=\`${JSON.stringify(reactTree, escapeJsx)}\`; </script>
  <script src="/build/_client.js" type="module"></script>`;

	return c.html(html);
});

/**
 * Serve your `build/` folder as static assets.
 * Allows you to serve built client components
 * to import from your browser.
 */
app.use('/build/*', serveStatic());
app.use('/app/styles/*', serveStatic());

/**
 * Build both server and client components with esbuild
 */
async function build() {

	getPageEntryPoints().then(entryPoints => {
		console.log('Entry points:', entryPoints);
	});
	const clientEntryPoints = new Set();

	/** Build the server component tree */
	await esbuild({
		bundle: true,
		format: 'esm',
		logLevel: 'error',
		entryPoints: [resolveApp('page.jsx'), ...await getPageEntryPoints()],
		outdir: resolveBuild(),
		loader: { '.js': 'jsx', '.ts': 'tsx', '.tsx': 'tsx' },
		// avoid bundling npm packages for server-side components
		packages: 'external',
		plugins: [
			{
				name: 'resolve-client-imports',
				setup(build) {
					// Intercept component imports to check for 'use client'
					build.onResolve({ filter: reactComponentRegex }, async ({ path: relativePath }) => {
						const path = resolveApp(relativePath);
						const contents = await readFile(path, 'utf-8');

						if (contents.startsWith("'use client'")) {
							clientEntryPoints.add(path);
							return {
								// Avoid bundling client components into the server build.
								external: true,
								// Resolve the client import to the built `.js` file
								// created by the client `esbuild` process below.
								path: relativePath.replace(reactComponentRegex, '.js')
							};
						}
					});
				}
			}
		]
	});

	/** Build client components */
	const { outputFiles } = await esbuild({
		bundle: true,
		format: 'esm',
		logLevel: 'error',
		entryPoints: [resolveApp('_client.jsx'), resolveApp('_clientComp.jsx'), ...clientEntryPoints],
		outdir: resolveBuild(),
		// splitting: true,
		splitting: false,
		write: false,
		loader: { '.js': 'jsx', '.ts': 'tsx', '.tsx': 'tsx' }
	});

	outputFiles.forEach(async (file) => {
		// Parse file export names
		const [, exports] = parse(file.text);
		let newContents = file.text;

		for (const exp of exports) {
			// Create a unique lookup key for each exported component.
			// Could be any identifier!
			// We'll choose the file path + export name for simplicity.
			const key = file.path + exp.n;

			clientComponentMap[key] = {
				// Have the browser import your component from your server
				// at `/build/[component].js`
				id: `/build/${relative(resolveBuild(), file.path)}`,
				// Use the detected export name
				name: exp.n,
				// Turn off chunks. This is webpack-specific
				chunks: [],
				// Use an async import for the built resource in the browser
				async: true
			};

			// Tag each component export with a special `react.client.reference` type
			// and the map key to look up import information.
			// This tells your stream renderer to avoid rendering the
			// client component server-side. Instead, import the built component
			// client-side at `clientComponentMap[key].id`
			newContents += `
${exp.ln}.$$id = ${JSON.stringify(key)};
${exp.ln}.$$typeof = Symbol.for("react.client.reference");
			`;
		}
		await writeFile(file.path, newContents);
	});
}

serve(app, async (info) => {
	await build();
	console.log(`Listening on http://localhost:${info.port}`);
});

/** UTILS */

const reactComponentRegex = /\.(jsx|tsx)$/;

const appDir = new URL('./app/', import.meta.url);
const buildDir = new URL('./build/', import.meta.url);

const bootstrapCSS = [];
const bootstrapSVGs = [];

function resolveApp(path = '') {
	return fileURLToPath(new URL(path, appDir));
}

function resolveBuild(path = '') {
	return fileURLToPath(new URL(path, buildDir));
}

async function isClientComponent(filePath) {
	const contents = await readFile(filePath, 'utf-8');
	return contents.startsWith("'use client'");
}

async function getPageEntryPoints() {
	const pagesDir = join(__dirname, 'app');
	const files = await readdir(pagesDir);

	const entryPoints = [];

	for (const file of files) {
		if (/^(Home|RefundCards|AppSSR)\.(jsx|tsx|js|ts)$/.test(file)) {
			const filePath = join(pagesDir, file);
			const contents = await readFile(filePath, 'utf-8');
			if (!contents.startsWith("'use client'") && !contents.startsWith('"use client"')) {
				entryPoints.push(filePath);
			}
		}
	}

	return entryPoints;
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Collecting css & svg
const staticCSSPathRoot = "/app/styles/";
const staticSVGPathRoot = "/app/images/";

const ReadDirectoryContentToArray = async (folderPath, array, fileType) => {
	const files = await readdir(join(__dirname, folderPath));
	files.forEach((fileName) => {
		if (fileName.endsWith(fileType)) {
			array.push(`${folderPath}/${fileName}`);
		}
	});
};
await ReadDirectoryContentToArray(staticCSSPathRoot, bootstrapCSS, '.css');
await ReadDirectoryContentToArray(staticSVGPathRoot, bootstrapSVGs, '.svg');

// Converting JSX to React.Element(s)
const createReactTree = async (jsx) => {
	if (!jsx) {
		return;
	}

	if (["string", "boolean", "number"].includes(typeof jsx)) {
		return jsx;
	}

	if (Array.isArray(jsx)) {
		return await Promise.all(jsx.map(createReactTree));
	}

	if (typeof jsx === "object" && jsx !== null) {
		if (jsx.$$typeof === Symbol.for("react.element")) {
			if (typeof jsx.type === "string") {
				return { ...jsx, props: await createReactTree(jsx.props) };
			}

			if (typeof jsx.type === "function") {
				const Component = jsx.type;
				const props = jsx.props;
				const renderedComponent = await Component(props);
				return await createReactTree(renderedComponent);
			}
		}

		return Object.fromEntries(
			await Promise.all(
				Object.entries(jsx).map(async ([key, value]) => [
					key,
					await createReactTree(value),
				])
			)
		);
	}
};

const escapeJsx = (key, value) => {
	if (value === Symbol.for("react.element")) {
		return "$";
	}
	return value;
};