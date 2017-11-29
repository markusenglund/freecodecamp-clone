import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";

class CommunityDropdown extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }
  render() {
    return (
      <Wrapper
        style={{ zIndex: 1 }}
        onSelection={() => {}}
        onMenuToggle={({ isOpen }) => {
          this.setState({ isOpen });
        }}
      >
        <Button
          className={`header-item ${this.state.isOpen &&
            "dropdown-button-open"}`}
        >
          Community
        </Button>
        <Menu className="dropdown-menu">
          <MenuItem
            className="dropdown-item"
            tag="a"
            href="https://gitter.im/freecodecamp/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat
          </MenuItem>
          <MenuItem
            className="dropdown-item"
            tag="a"
            href="https://forum.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forum
          </MenuItem>
          <MenuItem
            className="dropdown-item"
            tag="a"
            href="https://guide.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guide
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}

export default CommunityDropdown;
