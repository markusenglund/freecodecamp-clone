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
  render() {
    const { updateCode, code } = this.props;
    return (
      <CodeMirror
        value={code}
        onChange={updateCode}
        options={{
          lineNumbers: true,
          lineWrapping: true,
          theme: "monokai",
          mode: "htmlmixed"
        }}
        className="challenge-editor"
      />
    );
  }
}

DomChallenge.propTypes = {
  updateCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired
};

// const mapStateToProps = state => {
//   const currentChallengeName = state.router.pathname.split("/")[2];
//   const challenge = state.challenges[currentChallengeName];
//   return { challenge };
// };

export default connect()(DomChallenge);
