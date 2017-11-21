import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "redux-little-router";
import { connect } from "react-redux";
import "./Header.scss";
import CommunityDropdown from "./CommunityDropdown";
import logo from "../../assets/images/freecodecamp_logo.svg";

class Header extends Component {
  toggleSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({ type: "TOGGLE_SIDEBAR_OPEN" });
  };

  handleMapKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.toggleSidebarOpen();
    }
  };

  render() {
    return (
      <header>
        <Link href="/" className="header-logo-link">
          <img src={logo} alt="freeCodeCamp logo" className="header-logo" />
        </Link>
        <div className="header-right">
          <div
            role="button"
            tabIndex={0}
            onClick={this.toggleSidebarOpen}
            onKeyDown={this.handleMapKeyDown}
            className="header-item"
          >
            Map
          </div>
          <a
            href="https://donate.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-item"
          >
            Donate
          </a>
          <CommunityDropdown />
          <Link href="/profile" className="header-item">
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Header);
