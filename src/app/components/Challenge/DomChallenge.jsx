import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ChallengeDescription from "./ChallengeDescription";
import Editor from "./Editor";
import Preview from "./Preview";
import SuccessModal from "./SuccessModal";

import "./DomChallenge.scss";

class DomChallenge extends Component {
  constructor(props) {
    super(props);
    const { challengeSeed } = this.props;
    this.state = {
      code: challengeSeed.join("\n"),
      modalIsOpen: false
    };
  }

  componentWillReceiveProps = ({ challengeSeed }) => {
    this.setState({ code: challengeSeed.join("\n") });
  };

  updateCode = (editor, data, value) => {
    this.setState({ code: value });
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
  challengeSeed: PropTypes.arrayOf(PropTypes.string)
};
DomChallenge.defaultProps = { challengeSeed: [] };

const mapStateToProps = (state, { match }) => {
  const challengeName = match.params.challenge;
  const challenge = state.challenges[challengeName] || {};
  return { challengeSeed: challenge.challengeSeed };
};

export default withRouter(connect(mapStateToProps)(DomChallenge));
