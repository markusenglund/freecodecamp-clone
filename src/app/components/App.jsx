import React from "react";
import { Fragment, Link } from "redux-little-router";
import Counter from "./Counter";
import About from "./About";
import "./App.scss";
import gandalf from "../assets/gandalf.gif";

const App = () => (
  <div>
    <Link href="/counter">Counter</Link>
    <Link href="/about">About</Link>
    <h1 className="asdf">Home</h1>
    <img src={gandalf} alt="gandalf" />
    <Fragment forRoute="/counter">
      <Counter />
    </Fragment>
    <Fragment forRoute="/about">
      <About />
    </Fragment>
  </div>
);

export default App;
