import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import "./SuccessModal.scss";

class SuccessModal extends Component {
  render() {
    return (
      <Modal
        isOpen
        contentLabel="Tests have passed"
        className="success-modal"
        overlayClassName="success-modal-overlay"
      >
        <div>
          <h1>ITs a modal what is up</h1>
          <p>ASDASDASD</p>
        </div>
      </Modal>
    );
  }
}

// SuccessModal.propTypes = {
//   updateCode: PropTypes.func.isRequired,
//   code: PropTypes.string.isRequired
// };

export default connect()(SuccessModal);

function asdf() {
  console.log("asdf");
}
