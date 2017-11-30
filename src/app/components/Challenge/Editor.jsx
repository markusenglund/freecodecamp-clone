import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CodeMirror from "react-codemirror";
import "./codemirror.scss";
if (process.browser) {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/htmlmixed/htmlmixed");
}

class DomChallenge extends Component {
  constructor() {
    super();
    this.state = { code: "// Start coding!" };
  }

  updateCode = code => {
    this.setState({ code });
  };

  render() {
    return (
      <div>
        <h1>Editor</h1>
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode}
          options={{
            lineNumbers: true,
            lineWrapping: true,
            mode: "htmlmixed"
          }}
        />
      </div>
    );
  }
}

// DomChallenge.propTypes = {
//   challenge: PropTypes.shape({
//     description: PropTypes.arrayOf(PropTypes.string),
//     name: PropTypes.string
//   }).isRequired
// };

// const mapStateToProps = state => {
//   const currentChallengeName = state.router.pathname.split("/")[2];
//   const challenge = state.challenges[currentChallengeName];
//   return { challenge };
// };

export default connect()(DomChallenge);
