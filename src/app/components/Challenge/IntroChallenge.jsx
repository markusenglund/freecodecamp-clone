import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "redux-little-router";

import InvisibleImages from "./InvisibleImages";

import { finishChallenge } from "../../actionCreators";

// import { fetchChallenge } from "../../actionCreators";

class IntroChallenge extends Component {
  constructor() {
    super();
    this.state = { pageIndex: 0 };
  }

  componentDidUpdate() {
    if (this.node) {
      this.node.focus();
    }
  }

  handleFinishClick = () => {
    const { dispatch, challenge, nextChallenge } = this.props;

    dispatch(finishChallenge(challenge));
    dispatch(push(`/challenge/${nextChallenge}`));
  };

  changePage = pageIndex => {
    this.setState({ pageIndex });
  };

  render() {
    // const { page, pageIndex, length, changePage, name, dispatch } = this.props;
    const { description } = this.props.challenge;
    const { pageIndex } = this.state;
    const [imageSrc, imageAlt, infoText] = description[pageIndex];
    return (
      <div className="intro-challenge">
        <div
          tabIndex={-1}
          className="intro-challenge-page"
          ref={n => {
            this.node = n;
          }}
        >
          <img src={imageSrc} alt={imageAlt} className="intro-image" />
          <p className="intro-text">{infoText}</p>
          {pageIndex !== description.length - 1 ? (
            <button
              className="intro-button"
              onClick={() => this.changePage(pageIndex + 1)}
            >
              Go to my next step
            </button>
          ) : (
            <button className="intro-button" onClick={this.handleFinishClick}>
              Finish challenge
            </button>
          )}
        </div>

        <p>{`( ${pageIndex + 1} / ${description.length} )`}</p>
        <InvisibleImages images={description.map(page => [page[0], page[1]])} />
      </div>
    );
  }
}

IntroChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.array,
    dashedName: PropTypes.string
  }).isRequired,
  nextChallenge: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName];
  let nextChallenge = "";
  if (Object.keys(state.map).length > 0) {
    const challenges = Object.values(state.map)
      .reduce(
        (acc, superBlock) => acc.concat(Object.values(superBlock.blocks)),
        []
      )
      .reduce((acc, block) => acc.concat(Object.keys(block.challenges)), []);
    const currentIndex = challenges.findIndex(
      challengeName => challengeName === currentChallengeName
    );
    nextChallenge = challenges[currentIndex + 1];
  }

  return { challenge, nextChallenge };
};

export default connect(mapStateToProps)(IntroChallenge);
