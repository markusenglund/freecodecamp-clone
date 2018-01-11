import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import FaCaretRight from "react-icons/lib/fa/caret-right";
import FaCircleThin from "react-icons/lib/fa/circle-thin";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import FaTimesCircleO from "react-icons/lib/fa/times-circle-o";

import "./Map.scss";

/*
IDEAL DATA STRUCTURE:
superBlocks: {
  [superBlockKey]: {
    title, order, isOpen, blocks: {
      [blockKey]: {
        title, order, time, isLocked, challenges: {
          [challengeKey]: {
            title, order, time, challengeType, isRequired, isCompleted
} } } } } }
*/
class Map extends Component {
  toggleSuperBlockExpansion = superBlockKey => {
    const { dispatch } = this.props;
    dispatch({ type: "TOGGLE_SUPER_BLOCK_EXPANSION", payload: superBlockKey });
  };

  toggleBlockExpansion = (blockKey, superBlockKey) => {
    const { dispatch } = this.props;
    dispatch({
      type: "TOGGLE_BLOCK_EXPANSION",
      payload: { blockKey, superBlockKey }
    });
  };
  toggleSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({ type: "TOGGLE_SIDEBAR_OPEN" });
  };

  // TODO: Split up 140 line god component into multiple separate components
  render() {
    const { superBlocks } = this.props;

    const defaultStyle = {
      transition: "opacity 0.5s, transform 0.3s"
    };

    const transitionStyles = {
      entering: { opacity: 0, transform: "translateY(-10px)" },
      entered: { opacity: 1, transform: "translateY(0)" }
    };

    return (
      <div className="map">
        <button onClick={this.toggleSidebarOpen} className="map-x-button">
          <FaTimesCircleO />
        </button>
        {Object.keys(superBlocks).map(superBlockKey => (
          <div className="super-block" key={superBlockKey}>
            <button
              onClick={() => this.toggleSuperBlockExpansion(superBlockKey)}
              className="super-block-title map-item"
            >
              <div>
                <FaCaretRight
                  style={{
                    transform:
                      superBlocks[superBlockKey].isOpen && "rotate(90deg)",
                    transition: "transform, 0.2s"
                  }}
                />
              </div>
              <div className="map-item-text">
                {superBlocks[superBlockKey].title}
              </div>
            </button>

            <Transition
              in={superBlocks[superBlockKey].isOpen}
              timeout={0}
              mountOnEnter
              unmountOnExit
            >
              {status => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[status]
                  }}
                >
                  {Object.keys(superBlocks[superBlockKey].blocks).map(
                    blockKey => (
                      <div key={blockKey}>
                        <button
                          onClick={() =>
                            this.toggleBlockExpansion(blockKey, superBlockKey)
                          }
                          className="block-title map-item"
                          key={blockKey}
                        >
                          <div>
                            <FaCaretRight
                              style={{
                                transform:
                                  superBlocks[superBlockKey].blocks[blockKey]
                                    .isOpen && "rotate(90deg)",
                                transition: "transform, 0.2s"
                              }}
                            />
                          </div>
                          <div className="map-item-text">
                            <span>
                              {
                                superBlocks[superBlockKey].blocks[blockKey]
                                  .title
                              }
                            </span>
                            <span className="map-time">
                              ({
                                superBlocks[superBlockKey].blocks[blockKey].time
                              })
                            </span>
                          </div>
                        </button>
                        <Transition
                          in={
                            superBlocks[superBlockKey].blocks[blockKey].isOpen
                          }
                          timeout={0}
                          mountOnEnter
                          unmountOnExit
                        >
                          {status2 => (
                            <div
                              style={{
                                ...defaultStyle,
                                ...transitionStyles[status2]
                              }}
                            >
                              {Object.keys(
                                superBlocks[superBlockKey].blocks[blockKey]
                                  .challenges
                              ).map(challengeKey => (
                                <div key={challengeKey}>
                                  <Link
                                    className="map-item challenge-title"
                                    to={`/challenge/${challengeKey}`}
                                  >
                                    <div>
                                      {superBlocks[superBlockKey].blocks[
                                        blockKey
                                      ].challenges[challengeKey].isCompleted ? (
                                        <FaCheckCircle className="map-challenge-icon" />
                                      ) : (
                                        <FaCircleThin className="map-challenge-icon" />
                                      )}
                                    </div>
                                    <span className="map-item-text">
                                      {
                                        superBlocks[superBlockKey].blocks[
                                          blockKey
                                        ].challenges[challengeKey].title
                                      }
                                    </span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </Transition>
                      </div>
                    )
                  )}
                </div>
              )}
            </Transition>
          </div>
        ))}
      </div>
    );
  }
}

Map.propTypes = {
  superBlocks: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  superBlocks: state.map
});

export default connect(mapStateToProps)(Map);
