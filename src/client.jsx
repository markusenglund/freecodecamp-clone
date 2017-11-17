import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { routerForBrowser } from "redux-little-router";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./app/reducers/reducers";
import App from "./app/components/App";
import Head from "./app/components/Head";
import routes from "./app/routes";

const { reducer, middleware, enhancer } = routerForBrowser({
  routes
});

const preloadedState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

const store = createStore(
  combineReducers({ ...reducers, router: reducer }),
  preloadedState,
  composeWithDevTools(enhancer, applyMiddleware(middleware))
);
const render = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
};

const renderHead = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Head />
    </Provider>,
    document.querySelector("head")
  );
};

render();
renderHead();
