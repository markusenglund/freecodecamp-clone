import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "redux-little-router";
import "./Header.scss";
import logo from "../../assets/freecodecamp_logo.svg";

class Header extends Component {
  render() {
    return (
      <header>
        <Link href="/" className="header-logo-link">
          <img src={logo} alt="freeCodeCamp logo" className="header-logo" />
        </Link>
        <div className="header-right">
          <Link href="/" className="header-item">
            Map
          </Link>
          <a
            href="https://donate.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-item"
          >
            Donate
          </a>
          <Link href="/" className="header-item">
            Community
          </Link>
          <Link href="/profile" className="header-item">
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
