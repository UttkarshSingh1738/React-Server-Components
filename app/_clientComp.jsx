// import { createRoot } from 'react-dom/client';
// import { createFromFetch } from 'react-server-dom-webpack/client';
//
// // HACK: map webpack resolution to native ESM
// // @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
// window.__webpack_require__ = async (id) => {
// 	return import(id);
// };
//
// // @ts-expect-error `root` might be null
// const root = createRoot(document.getElementById('root'));
//
// /**
//  * Fetch your server component stream from `/rsc`
//  * and render results into the root element as they come in.
//  */
// createFromFetch(fetch('/rsc')).then(comp => {
// 	console.log("fetched");
// 	root.render(comp);
// })

import { createRoot } from 'react-dom/client';
import loadable from '@loadable/component';
import GlobalSideNavComponent from './GlobalSideNavComponent';
import Spinner from './Spinner';

const RoutingDelayView = loadable(() => import('./RoutingDelayView'), {
	fallback: <Spinner />,
});
const RefundTransactionHome = loadable(() => import('./RefundTransactionHome'), {
	fallback: <Spinner />,
});
const ManualRefundHome = loadable(() => import('./ManualRefundHome'), {
	fallback: <Spinner />,
});

// Get the page component path from the global variable
let pageComponentPath = window.__pageComponentPath;
pageComponentPath = pageComponentPath.replace(/\.js$/, '.tsx');
const componentName = pageComponentPath
	.replace('/app/', '')
	.replace('.tsx', '');

const componentMap = {
	RoutingDelayView,
	RefundTransactionHome,
	ManualRefundHome,
};

const sideNavRoot = createRoot(document.getElementById('global-side-nav-placeholder'));
sideNavRoot.render(<GlobalSideNavComponent />);

// Hydrate the client component
const clientComponentId = 'component-mount';
const clientComponentRoot = createRoot(document.getElementById(clientComponentId));

const renderClientComponent = () => {
	if (componentMap[componentName]) {
		const ClientComponent = componentMap[componentName];
		clientComponentRoot.render(<ClientComponent />);
	} else {
		console.error(`Component ${componentName} not found`);
	}
};

// Call the function to render the client component
renderClientComponent();

// // Function to dynamically import and render the client component based on the pageComponentPath
// const loadClientComponent = async () => {
// 	if (pageComponentPath) {
// 		try {
// 			const componentModule = await import(`${pageComponentPath}`);
// 			const ClientComponent = componentModule.default;
// 			clientComponentRoot.render(<ClientComponent />);
// 		} catch (error) {
// 			console.error('Failed to load client component:', error);
// 		}
// 	}
// };
//
// // Call the function to load and render the client component
// loadClientComponent();
