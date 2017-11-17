import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { routerForExpress } from "redux-little-router";

import routes from "../app/routes";
import App from "../app/components/App";
import Head from "../app/components/Head";
import reducers from "../app/reducers/reducers";

export default function renderPage(req, res) {
  const { reducer, middleware, enhancer } = routerForExpress({
    routes,
    request: req
  });
  const store = createStore(
    combineReducers({ ...reducers, router: reducer }),
    { counter: 5 },
    compose(enhancer, applyMiddleware(middleware))
  );
  const appString = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headString = renderToString(
    <Provider store={store}>
      <Head />
    </Provider>
  );
  const preloadedState = store.getState();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>${headString}</head>
      <body>
        <div id="app">${appString}</div>
      </body>
      <script>
        window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/public/bundle.js"></script>
    </html>
  `;
  res.send(html);
}
