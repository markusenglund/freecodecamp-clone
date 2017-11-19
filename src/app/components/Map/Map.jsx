import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
import FaCaretRight from "react-icons/lib/fa/caret-right";

import "./Map.scss";

/*
IDEAL DATA STRUCTURE:
superBlocks: {
  superBlock: {
    readable, isOpen, block: {
      readable, isOpen, time, challenge: {
        readable, isCompleted, challengeType
      }
} } }
*/
class Map extends Component {
  toggleExpansion(name) {
    const { dispatch } = this.props;
    dispatch({ type: "TOGGLE_EXPANSION", payload: name });
  }

  render() {
    const { challenges } = this.props;
    console.log(challenges);

    const defaultStyle = {
      transition: "opacity, 0.5s",
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 }
    };

    return (
      <div className="map">
        {Object.values(challenges).map(superBlock => (
          <div className="super-block" key={superBlock.order}>
            <button
              onClick={() => this.toggleExpansion(superBlock.dashedName)}
              className="super-block-title"
            >
              <FaCaretRight
                style={{
                  transform: superBlock.isOpen && "rotate(90deg)",
                  transition: "transform, 0.2s"
                }}
              />
              {superBlock.title}
            </button>

            <Transition
              in={superBlock.isOpen}
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
                  {superBlock.blocks.map(block => (
                    <button className="block" key={block}>
                      {block}
                    </button>
                  ))}
                </div>
              )}
            </Transition>

            {/* {superBlock.isOpen && (
              <div
                className="block-list"
                style={{ opacity: superBlock.isOpen ? 1 : 0 }}
              >
                {superBlock.blocks.map(block => (
                  <button className="block" key={block}>
                    {block}
                  </button>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    );
  }
}

Map.propTypes = {
  challenges: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  challenges: state.map
});

export default connect(mapStateToProps)(Map);
