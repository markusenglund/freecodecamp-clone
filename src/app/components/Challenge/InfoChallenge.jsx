import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "redux-little-router";

import InvisibleImages from "./InvisibleImages";
import { finishChallenge } from "../../actionCreators";
import { getNextChallengeName } from "../../selectors/challengeSelectors";

class InfoChallenge extends Component {
  constructor() {
    super();
    this.state = { pageIndex: 0, hasLinkBeenOpened: false };
  }

  componentDidUpdate() {
    if (this.node) {
      this.node.focus();
    }
  }

  handleFinishClick = () => {
    const { dispatch, challenge, nextChallengeName } = this.props;

    dispatch(finishChallenge(challenge));
    dispatch(push(`/challenge/${nextChallengeName}`));
  };

  changePage = pageIndex => {
    this.setState({ pageIndex, hasLinkBeenOpened: false });
  };

  render() {
    const { description } = this.props.challenge;
    const { pageIndex, hasLinkBeenOpened } = this.state;
    const [imageSrc, imageAlt, infoText, linkHref] = description[pageIndex];
    return (
      <div
        tabIndex={-1}
        className="info-challenge"
        ref={n => {
          this.node = n;
        }}
      >
        {imageSrc && (
          <img src={imageSrc} alt={imageAlt} className="info-challenge-image" />
        )}
        <div
          className="info-challenge-text"
          dangerouslySetInnerHTML={{ __html: infoText }}
        />
        {linkHref && (
          <a
            href={linkHref}
            className="primary-button info-challenge-button-a"
            onClick={() => this.setState({ hasLinkBeenOpened: true })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open link in new tab (this unlocks the next step)
          </a>
        )}
        <div className="info-challenge-button-collection">
          {pageIndex !== 0 && (
            <button
              className="primary-button info-challenge-button"
              onClick={() => this.changePage(pageIndex - 1)}
            >
              Go to my previous step
            </button>
          )}
          {pageIndex !== description.length - 1 ? (
            <button
              disabled={!hasLinkBeenOpened && linkHref}
              className="primary-button info-challenge-button"
              onClick={() => this.changePage(pageIndex + 1)}
            >
              Go to my next step
            </button>
          ) : (
            <button
              className="primary-button info-challenge-button"
              onClick={this.handleFinishClick}
            >
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

InfoChallenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.array,
    dashedName: PropTypes.string
  }).isRequired,
  nextChallengeName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[currentChallengeName];
  return {
    challenge,
    nextChallengeName: getNextChallengeName(state)
  };
};

export default connect(mapStateToProps)(InfoChallenge);
