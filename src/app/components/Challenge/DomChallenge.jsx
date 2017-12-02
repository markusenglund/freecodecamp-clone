import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import /* { assert } */ chai from "chai";
import jquery from "jquery";
import Editor from "./Editor";
import Preview from "./Preview";
import "./DomChallenge.scss";

class DomChallenge extends Component {
  constructor(props) {
    super(props);
    const { challenge } = this.props;
    this.state = {
      code: challenge.challengeSeed[0],
      error: null,
      testsPassed: false
    };
  }

  updateCode = code => {
    this.setState({ code });
  };

  testCode = () => {
    // const { code } = this.state;
    const { tests } = this.props.challenge;
    /* eslint-disable no-unused-vars */
    const { assert } = chai;
    const $ = jquery;
    /* eslint-enable no-unused-vars */

    try {
      tests.forEach(test => {
        // console.log(test.text, test.testString, code);
        eval(test.testString);
        this.setState({ testsPassed: true });
      });
    } catch (e) {
      this.setState({ error: e });
    }
  };

  render() {
    const { description, name } = this.props.challenge;
    return (
      <div className="dom-challenge">
        <div className="dom-challenge-description">
          <h1 className="dom-challenge-name">{name}</h1>
          {description.map((descriptionHtml, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ))}
          <button className="dom-challenge-button" onClick={this.testCode}>
            Run tests (Ctrl + Enter)
          </button>
          <h2>Test-stuff incomplete</h2>
          {this.state.testsPassed && "The tests have motherfucking passed"}
          <div dangerouslySetInnerHTML={{ __html: this.state.error }} />
          {/* <div>{tests.map(test => <div>{test}</div>)}</div> */}
        </div>
        <Editor code={this.state.code} updateCode={this.updateCode} />
        <Preview code={this.state.code} />
      </div>
    );
  }
}

DomChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    tests: PropTypes.arrayOf(PropTypes.object)
    // tests: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName];
  return { challenge };
};

export default connect(mapStateToProps)(DomChallenge);
