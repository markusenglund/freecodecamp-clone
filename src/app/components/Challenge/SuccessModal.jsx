import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "redux-little-router";
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
    const { dispatch, challenge, nextChallengeName, closeModal } = this.props;
    dispatch(finishChallenge(challenge));
    dispatch(push(`/challenge/${nextChallengeName}`));
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[challengeName] || {};
  return {
    challenge,
    nextChallengeName: getNextChallengeName(state)
  };
};

export default connect(mapStateToProps)(SuccessModal);
