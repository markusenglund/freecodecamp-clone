import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment, Link } from "redux-little-router";
import PropTypes from "prop-types";
import Sidebar from "react-sidebar";

import "./App.scss";
import Header from "./Header/Header";
import Map from "./Map/Map";
import { fetchMapData } from "../actionCreators";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMapData());
  }

  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({ type: "TOGGLE_SIDEBAR_OPEN" });
  };

  render() {
    const { sidebarOpen } = this.props;
    return (
      <Sidebar
        sidebar={<Map />}
        open={sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight
        styles={{
          overlay: {
            zIndex: 1,
            position: "relative",
            top: "none",
            left: "none",
            right: "none",
            bottom: "none",
            opacity: 1,
            visibility: "visible",
            transition: "none",
            backgroundColor: "none"
          }
        }}
        sidebarClassName="sidebar"
      >
        <div>
          <Header />
        </div>
      </Sidebar>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ sidebarOpen: state.sidebar.isOpen });

export default connect(mapStateToProps)(App);
