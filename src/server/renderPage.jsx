import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import thunk from "redux-thunk";
import { Helmet } from "react-helmet";

import App from "../app/components/App";
import reducers from "../app/reducers/reducers";

export default function renderPage(req, res) {
  const store = createStore(
    combineReducers(reducers),
    { counter: 5 },
    applyMiddleware(thunk)
  );

  const context = {};

  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const preloadedState = { counter: store.getState().counter };
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/public/bundle.css">
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
      </head>
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
