import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import iphoneFrame from "../../../assets/images/iphone-frame-cropped.png";

class Preview extends Component {
  render() {
    const { code } = this.props;
    return (
      <div className="challenge-preview-wrapper">
        <div className="challenge-preview">
          <img
            className="challenge-preview-image"
            src={iphoneFrame}
            alt="iphone-frame"
          />
          <div
            dangerouslySetInnerHTML={{ __html: code }}
            className="challenge-preview-text"
          />
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  code: PropTypes.string.isRequired
};

// const mapStateToProps = state => {
//   const currentChallengeName = state.router.pathname.split("/")[2];
//   const challenge = state.challenges[currentChallengeName];
//   return { challenge };
// };

export default connect()(Preview);
