import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchChallenge } from "../../actionCreators";

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
      return <div>{challenge.description}</div>;
    }
    return <div>SPINNER</div>;
  }
}

Challenge.propTypes = {
  dispatch: PropTypes.func.isRequired,
  challengeName: PropTypes.string.isRequired,
  challenge: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  return {
    challenge: state.challenges[challengeName] || {},
    challengeName
  };
};

export default connect(mapStateToProps)(Challenge);
