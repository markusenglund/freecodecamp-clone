import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import superBlocks from "../../assets/super-blocks.json";
import "./Map.scss";

/*
REQUIRED DATA:
superBlocks: {
  superBlock: {
    readable, block: {
      readable, time, challenge: {
        readable, isCompleted
      }
} } }
*/
class Map extends Component {
  render() {
    const { challenges } = this.props;
    return (
      <div className="map">
        {Object.values(superBlocks).map(superBlock => (
          <div className="super-block" key={superBlock.order}>
            <div className="super-block-title">{superBlock.title}</div>
            {superBlock.isOpen && (
              <div className="block-list">
                {superBlock.blocks.map(block => (
                  <div className="block" key={block}>
                    {block}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {challenges.map(superBlock => <div>{superBlock}</div>)}
      </div>
    );
  }
}

Map.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = state => ({
  challenges: state.map
});

export default connect(mapStateToProps)(Map);
