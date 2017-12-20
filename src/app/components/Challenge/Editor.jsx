import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./codemirror.css";
import "./monokai.css";

/* eslint-disable global-require */
if (process.browser) {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/htmlmixed/htmlmixed");
}
/* eslint-enable */

class Editor extends Component {
  render() {
    const { updateCode, code } = this.props;
    if (!code) {
      return (
        <div className="challenge-editor">
          <div className="mock-codemirror" />
        </div>
      );
    }
    return (
      <CodeMirror
        value={code}
        onBeforeChange={updateCode}
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

Editor.propTypes = {
  updateCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired
};

// const mapStateToProps = state => {
//   const currentChallengeName = state.router.pathname.split("/")[2];
//   const challenge = state.challenges[currentChallengeName];
//   return { challenge };
// };

export default connect()(Editor);
