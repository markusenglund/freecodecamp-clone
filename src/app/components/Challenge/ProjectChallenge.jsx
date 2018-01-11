import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProjectChallenge extends Component {
  render() {
    const { description, challengeSeed: imageIds } = this.props.challenge;

    if (!description) {
      return <div>SPINNER</div>;
    }

    return (
      <div className="project-challenge">
        <div className="dom-challenge-description">
          {description.map((descriptionHtml, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ))}
        </div>
        <div className="challenge-images">
          {imageIds.map(imageId => (
            <img
              src={`https://imgur.com/${imageId}.png`}
              alt="Example project"
              key={imageId}
            />
          ))}
        </div>
      </div>
    );
  }
}

ProjectChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.array,
    challengeSeed: PropTypes.array
  }).isRequired
  // nextChallengeName: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, { match }) => {
  const challengeName = match.params.challenge;
  const challenge = state.challenges[challengeName] || {};
  return {
    challenge
    // nextChallengeName: getNextChallengeName(state)
  };
};

export default withRouter(connect(mapStateToProps)(ProjectChallenge));
