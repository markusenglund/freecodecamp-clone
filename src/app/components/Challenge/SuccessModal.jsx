import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import FaCheckCircle from "react-icons/lib/fa/check-circle";

import { finishChallenge } from "../../actionCreators";
import { getNextChallengeName } from "../../selectors/challengeSelectors";

import "./SuccessModal.scss";

class SuccessModal extends Component {
  componentWillMount() {
    if (process.browser) {
      Modal.setAppElement("#app");
    }
  }

  handleSubmitChallenge = () => {
    const {
      dispatch,
      challenge,
      nextChallengeName,
      closeModal,
      history
    } = this.props;
    dispatch(finishChallenge(challenge));
    // FIXME: This should be in the finishChallenge action creator I reckon.
    history.push(`/challenge/${nextChallengeName}`);
    closeModal();
  };

  render() {
    const { isOpen, closeModal } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Tests have passed"
        className="success-modal"
        overlayClassName="success-modal-overlay"
      >
        <>
          <div className="success-modal-header">
            <div>Good job!</div>
          </div>
          <div className="success-modal-icon">
            <FaCheckCircle />
          </div>
          <div className="success-modal-button-wrapper">
            <button
              className="primary-button success-modal-button"
              onClick={this.handleSubmitChallenge}
            >
              Submit and go to my next challenge (Ctrl + Enter)
            </button>
          </div>
        </>
      </Modal>
    );
  }
}

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  challenge: PropTypes.shape({
    description: PropTypes.array,
    dashedName: PropTypes.string
  }).isRequired,
  nextChallengeName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

const mapStateToProps = (state, { match }) => {
  const challengeName = match.params.challenge;
  const challenge = state.challenges[challengeName] || {};
  return {
    challenge,
    nextChallengeName: getNextChallengeName(state, challengeName)
  };
};

export default withRouter(connect(mapStateToProps)(SuccessModal));
