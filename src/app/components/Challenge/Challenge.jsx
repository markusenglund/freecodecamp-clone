import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchChallenge } from "../../actionCreators";
import IntroChallenge from "./IntroChallenge";
import "./Challenge.scss";

class Challenge extends Component {
  componentDidMount() {
    const { dispatch, challengeName, challenge } = this.props;
    if (Object.keys(challenge).length === 0) {
      dispatch(fetchChallenge(challengeName));
    }
  }
  componentDidUpdate() {
    const { dispatch, challengeName, challenge } = this.props;
    if (Object.keys(challenge).length === 0) {
      dispatch(fetchChallenge(challengeName));
    }
  }

  render() {
    const { challenge } = this.props;
    if (Object.keys(challenge).length !== 0) {
      if (challenge.challengeType === 7) {
        return <IntroChallenge challenge={challenge} />;
      }
      return <div>{challenge.description}</div>;
    }
    return <div>SPINNER</div>;
  }
}

Challenge.propTypes = {
  dispatch: PropTypes.func.isRequired,
  challengeName: PropTypes.string.isRequired,
  challenge: PropTypes.shape({ description: PropTypes.array }).isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  return {
    challenge: state.challenges[challengeName] || {},
    challengeName
  };
};

export default connect(mapStateToProps)(Challenge);
