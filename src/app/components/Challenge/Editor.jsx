import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CodeMirror from "react-codemirror";
import "./codemirror.css";
import "./monokai.css";
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
  /*
  fcc options:
    lint: {
    esversion: 6,
    predef: envProps
  },
  lineNumbers: true,
  mode: 'javascript',
  runnable: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  scrollbarStyle: 'null',
  lineWrapping: true,
  gutters: [ 'CodeMirror-lint-markers' ]
  */
  render() {
    return (
      <div className="challenge-editor-wrapper">
        <h1>Editor</h1>
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode}
          options={{
            lineNumbers: true,
            lineWrapping: true,
            theme: "monokai",
            mode: "htmlmixed"
          }}
          className="challenge-editor"
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
