import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./DomChallenge.scss";

class DomChallenge extends Component {
  render() {
    const { description, name, tests } = this.props.challenge;
    return (
      <div>
        <div className="dom-challenge-description">
          <h1 className="dom-challenge-name">{name}</h1>
          <div>
            {description.map(descriptionHtml => (
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            ))}
          </div>
          <button className="dom-challenge-button">
            Run tests (Ctrl + Enter)
          </button>
          <h2>Test-stuff incomplete</h2>
          <div>{tests.map(test => <div>{test}</div>)}</div>
        </div>
      </div>
    );
  }
}

DomChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName];
  return { challenge };
};

export default connect(mapStateToProps)(DomChallenge);
