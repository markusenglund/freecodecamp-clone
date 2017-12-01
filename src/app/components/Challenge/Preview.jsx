import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Preview extends Component {
  render() {
    const { code } = this.props;
    return (
      <div className="challenge-preview">
        <div dangerouslySetInnerHTML={{ __html: code }} />
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
