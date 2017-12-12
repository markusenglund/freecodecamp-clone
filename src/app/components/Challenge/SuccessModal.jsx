import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import "./SuccessModal.scss";

class SuccessModal extends Component {
  render() {
    const { isOpen, closeModal } = this.props;
    return (
      <Modal
        // isOpen={isOpen}
        isOpen
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
            <button className="button success-modal-button">
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
  closeModal: PropTypes.func.isRequired
};

// const mapStateToProps = state => {
//   const challengeName = state.router.pathname.split("/")[2];
//   const challenge = state.challenges[challengeName];
//   const testsHavePassed = challenge.tests.every(test => test.hasPassed);
//   return { testsHavePassed };
// };

export default connect()(SuccessModal);
