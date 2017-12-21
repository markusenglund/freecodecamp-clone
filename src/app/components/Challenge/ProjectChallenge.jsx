import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { push } from "redux-little-router";

// import InvisibleImages from "./InvisibleImages";
// import { finishChallenge } from "../../actionCreators";
// import { getNextChallengeName } from "../../selectors/challengeSelectors";

class ProjectChallenge extends Component {
  render() {
    const { description } = this.props.challenge;

    if (!description) {
      return <div>SPINNER</div>;
    }

    return (
      <div className="dom-challenge-description">
        {description.map((descriptionHtml, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ))}
      </div>
    );
  }
}

ProjectChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.array,
    dashedName: PropTypes.string
  }).isRequired
  // nextChallengeName: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName] || {};
  return {
    challenge
    // nextChallengeName: getNextChallengeName(state)
  };
};

export default connect(mapStateToProps)(ProjectChallenge);
