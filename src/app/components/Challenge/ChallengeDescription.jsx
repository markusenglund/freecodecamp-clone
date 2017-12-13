import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import chai from "chai";
import jquery from "jquery";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

class ChallengeDescription extends Component {
  testCode = () => {
    // These variables are needed to eval the test strings.
    /* eslint-disable no-unused-vars */
    const { dispatch, openModal, challenge, challengeName, code } = this.props;
    const { tests } = challenge;
    const { assert } = chai;
    const $ = jquery;
    /* eslint-enable no-unused-vars */

    const testStatuses = [];
    for (let i = 0; i < tests.length; i += 1) {
      try {
        /* eslint-disable no-eval */
        eval(tests[i].testString);
        testStatuses[i] = true;
      } catch (e) {
        /* eslint-enable no-eval */
        testStatuses[i] = false;
      }
    }
    // TODO: Submit action to make challenge.tests have hasPassed value
    dispatch({
      type: "TEST_CHALLENGE_CODE",
      testStatuses,
      challenge,
      challengeName
    });

    if (testStatuses.every(test => test)) {
      openModal();
    }
  };

  render = () => {
    const { description, name, tests } = this.props.challenge;
    if (!description) {
      return <div className="dom-challenge-description" />;
    }

    /* eslint-disable react/no-danger */
    return (
      <div className="dom-challenge-description">
        <h1 className="dom-challenge-name">{name}</h1>
        {description.map((descriptionHtml, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ))}
        <div className="dom-challenge-button-wrapper">
          <button
            className="primary-button dom-challenge-button"
            onClick={this.testCode}
          >
            Run tests (Ctrl + Enter)
          </button>
        </div>
        <h3>Test-stuff incomplete</h3>
        <div>
          {tests.map(test => (
            <div className="challenge-test" key={test.text}>
              <div>
                {test.hasPassed ? (
                  <FaCheckCircle className="test-icon-pass" />
                ) : (
                  <FaTimesCircle className="test-icon-fail" />
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: test.text }} />
            </div>
          ))}
        </div>
      </div>
    );
    /* eslint-enable react/no-danger */
  };
}

ChallengeDescription.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    tests: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  challengeName: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[challengeName];
  return { challenge, challengeName };
};

export default connect(mapStateToProps)(ChallengeDescription);
