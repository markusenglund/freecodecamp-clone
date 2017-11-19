import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment, Link } from "redux-little-router";
import PropTypes from "prop-types";

import "./App.scss";
import Header from "./Header/Header";
import Map from "./Map/Map";
import { fetchMapData } from "../actionCreators";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMapData());
  }

  render() {
    return (
      <div>
        <Header />
        <Map />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
