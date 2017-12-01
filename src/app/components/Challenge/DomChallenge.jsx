import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Editor from "./Editor";
import Preview from "./Preview";
import "./DomChallenge.scss";

class DomChallenge extends Component {
  constructor() {
    super();
    this.state = { code: "<!-- Write code here -->" };
  }

  updateCode = code => {
    this.setState({ code });
  };

  render() {
    const { description, name } = this.props.challenge;
    return (
      <div className="dom-challenge">
        <div className="dom-challenge-description">
          <h1 className="dom-challenge-name">{name}</h1>
          <div>
            {description.map((descriptionHtml, i) => (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ))}
          </div>
          <button className="dom-challenge-button">
            Run tests (Ctrl + Enter)
          </button>
          <h2>Test-stuff incomplete</h2>
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
    name: PropTypes.string
    // tests: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName];
  return { challenge };
};

export default connect(mapStateToProps)(DomChallenge);
