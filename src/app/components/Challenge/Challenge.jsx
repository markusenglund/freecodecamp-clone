import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchChallenge } from "../../actionCreators";
import { getChallengeType } from "../../selectors/challengeSelectors";
import InfoChallenge from "./InfoChallenge";
import DomChallenge from "./DomChallenge";
import ProjectChallenge from "./ProjectChallenge";
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
    const { challengeType } = this.props;
    if (challengeType === 7) {
      return <InfoChallenge />;
    }
    if (challengeType === 0) {
      return <DomChallenge />;
    }
    if (challengeType === 3) {
      return <ProjectChallenge />;
    }
    return <div>SPINNER</div>;
  }
}

Challenge.propTypes = {
  dispatch: PropTypes.func.isRequired,
  challengeName: PropTypes.string.isRequired,
  challenge: PropTypes.shape({ description: PropTypes.array }).isRequired,
  challengeType: PropTypes.number.isRequired
};

const mapStateToProps = (state, { match }) => {
  const challengeName = match.params.challenge;
  return {
    challenge: state.challenges[challengeName] || {},
    challengeName,
    challengeType: getChallengeType(state, challengeName)
  };
};

export default connect(mapStateToProps)(Challenge);
