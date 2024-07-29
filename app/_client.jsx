import { createRoot } from 'react-dom/client';
import { hydrateRoot } from "react-dom/client";
import GlobalSideNavComponent from './GlobalSideNavComponent.js';

const revive = (k, v) => {
  if (v === "$") {
    return Symbol.for("react.element");
  }
  return v;
};

// @ts-ignore
const markup = JSON.parse(window.__initialMarkup, revive);
// @ts-expect-error `root` might be null
const compRoot = hydrateRoot(document.getElementById('component-mount'), markup);

// @ts-expect-error `root` might be null
const sideNavRoot = createRoot(document.getElementById('global-side-nav-placeholder'));
sideNavRoot.render(<GlobalSideNavComponent />);

const navigate = (to) => {
  fetch(to)
    .then((response) => response.text()) // Get the response as text
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const scripts = doc.querySelectorAll('script');
      // @ts-ignore
      const jsonString = scripts[0].firstChild.textContent.substring(25,5000);
      const compMarkup = JSON.parse(jsonString, revive);
      compRoot.render(compMarkup);
    })
    .catch((error) => console.error('Navigation failed:', error));
};

const navigateClient = (to) => {
  window.location.href = to;
};

window.addEventListener("click", (e) => {
  let target = e.target;
  while (target && !target.getAttribute('data-heading')) {
    target = target.parentElement;
  }
  if (target && target.getAttribute('data-heading')) {
    const heading = target.getAttribute('data-heading').replace(/\s+/g, '');
    let route;

    if (heading === 'RefundManagement') {
      route = '/RefundCards.js';
    } else if (heading === 'RoutingManagement') {
      route = '/RoutingDelayView.js';
    } else if (heading === 'ManualRefunds') {
      route = '/ManualRefundHome.js';
    } else if (heading === 'RefundsTransactions') {
      route = '/RefundTransactionHome.js';
    } else {
      route = `/${heading}.js`;
    }

    e.preventDefault();
    window.history.pushState(null, null, route);
    if (route == '/RefundCards.js') {
      navigate(route);
    } else {
      navigateClient(route);
    }
  }
});

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.path) {
    navigate(event.state.path);
  } else {
    compRoot.render(markup);
  }
});