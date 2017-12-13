import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ChallengeDescription from "./ChallengeDescription";
import Editor from "./Editor";
import Preview from "./Preview";
import SuccessModal from "./SuccessModal";

import "./DomChallenge.scss";

class DomChallenge extends Component {
  constructor(props) {
    super(props);
    const { challenge } = this.props;
    this.state = {
      code: challenge.challengeSeed.join("\n"),
      modalIsOpen: false
    };
  }

  updateCode = code => {
    this.setState({ code });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="dom-challenge">
        <ChallengeDescription
          code={this.state.code}
          openModal={this.openModal}
        />
        <Editor code={this.state.code} updateCode={this.updateCode} />
        <Preview code={this.state.code} />
        <SuccessModal
          isOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

DomChallenge.propTypes = {
  challenge: PropTypes.shape({
    challengeSeed: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

const mapStateToProps = state => {
  const challengeName = state.router.pathname.split("/")[2];
  const challenge = state.challenges[challengeName];
  return { challenge };
};

export default connect(mapStateToProps)(DomChallenge);
