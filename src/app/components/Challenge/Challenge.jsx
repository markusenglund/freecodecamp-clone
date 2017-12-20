import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchChallenge } from "../../actionCreators";
import { getChallengeType } from "../../selectors/challengeSelectors";
import InfoChallenge from "./InfoChallenge";
import DomChallenge from "./DomChallenge";
import "./Challenge.scss";

class Challenge extends Component {
  componentDidMount() {
    // Should these be moved to individual challenge types?
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
    const { challenge, challengeType } = this.props;
    // if (Object.keys(challenge).length !== 0) {
    if (challengeType === 7) {
      return <InfoChallenge />;
    }
    if (challengeType === 0) {
      return <DomChallenge />;
    }
    // return <div>{challenge.description}</div>;
    return <div>SPINNER</div>;
  }
}

Challenge.propTypes = {
  dispatch: PropTypes.func.isRequired,
  challengeName: PropTypes.string.isRequired,
  challenge: PropTypes.shape({ description: PropTypes.array }).isRequired,
  challengeType: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  return {
    challenge: state.challenges[challengeName] || {},
    challengeName,
    challengeType: getChallengeType(state)
  };
};

export default connect(mapStateToProps)(Challenge);
