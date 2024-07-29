
# React Server Components from Scratch



A brief description of what this project does and who it's for


## Description

This repository is a from-scratch implementation of React Server Components (RSC) with Server-Side Rendering (SSR) without using any frameworks. Inspired by Dan Abramov's tutorial, this project demonstrates the benefits of server components such as zero bundle size, faster initial load time, and improved SEO. This implementation features a custom build system and navigation.

### Key Features:
Server Components: Rendered on the server, reducing the amount of JavaScript sent to the client.
Custom Build System: Avoids bundling npm packages for server-side components.
Custom Navigation: Ensures smooth client-side routing integrated with server-side rendering.

### Resources:
Dan Abramov's Tutorial (https://github.com/reactwg/server-components/discussions/5)


## Project Structure

```bash
app/
├── images/
├── styles/
├── components/
│   ├── ...
README.md
package-lock.json
package.json
pnpm-lock.yaml
server.js
tailwind.config.cjs
tsconfig.json
```

app/: Contains the main application components, images, and styles.

README.md: This file, providing an overview and instructions.

package.json: Dependency management files.

server.js: Node.js server using HONO, responsible for server rendering and handling build tasks.

tailwind.config.cjs: Configuration for Tailwind CSS.

tsconfig.json: TypeScript configuration file.


## Implementation

The main idea behind this implementation is to reduce the number of components that need to be rendered on the client, thereby minimizing the bundle size sent over the network. The server tree is maximized, and client components are minimized to the leaf nodes of the application. Server components are asynchronous and cannot use React hooks such as useState, useReducer, and useEffect, as they are rendered once on the server.

### Custom Build and Navigation
We avoid bundling npm packages for the server build. While traversing the tree, components with the ‘use client’ directive are intercepted and added to a set to bundle them separately.

```bash
const clientEntryPoints = new Set();
/** Build the server component tree */
await esbuild({
  bundle: true,
  format: 'esm',
  logLevel: 'error',
  entryPoints: [resolveApp('page.jsx'), ...await getPageEntryPoints()],
  outdir: resolveBuild(),
  loader: { '.js': 'jsx', '.ts': 'tsx', '.tsx': 'tsx' },
  packages: 'external',
  plugins: [
    {
      name: 'resolve-client-imports',
      setup(build) {
        build.onResolve({ filter: reactComponentRegex }, async ({ path: relativePath }) => {
          const path = resolveApp(relativePath);
          const contents = await readFile(path, 'utf-8');

          if (contents.startsWith("'use client'")) {
            clientEntryPoints.add(path);
            return {
              external: true,
              path: relativePath.replace(reactComponentRegex, '.js')
            };
          }
        });
      }
    }
  ]
});

```

When rendering, if a client component is encountered, the server renders a static shell and embeds a script for client-side interactivity. Server-side rendering resolves all promises and returns a JSON-like React tree.

```bash
window.addEventListener("click", (e) => {
  let target = e.target;
  while (target && !target.getAttribute('data-heading')) {
    target = target.parentElement;
  }
  if (target && target.getAttribute('data-heading')) {
    const heading = target.getAttribute('data-heading').replace(/\s+/g, '');
    let route;

    e.preventDefault();
    window.history.pushState(null, null, route);
    navigate(route);
  }
});

const navigate = (to) => {
  fetch(to)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const scripts = doc.querySelectorAll('script');
      const jsonString = scripts[0].firstChild.textContent.substring(25, 5000);
      const compMarkup = JSON.parse(jsonString, revive);
      compRoot.render(compMarkup);
    })
    .catch((error) => console.error('Navigation failed:', error));
};

```

## How to Run

### Installation

Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory>
```
Install dependencies:

```bash
npm install
# or if using pnpm
pnpm install
```
### Running the Server

Clean the build directory (optional):

```bash
npm run clean
```
Start the server:

```bash
node server.js
```
