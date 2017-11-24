import React, { Component } from "react";
import PropTypes from "prop-types";
// import { fetchChallenge } from "../../actionCreators";

class IntroChallenge extends Component {
  constructor() {
    super();
    this.state = { page: 0 };
  }
  render() {
    const { description } = this.props.challenge;
    const { page } = this.state;
    return (
      <div className="intro-challenge">
        <img
          src={description[page][0]}
          alt={description[page][1]}
          className="intro-image"
        />
        <p className="intro-text">{description[page][2]}</p>
        {/* <div className="intro-navigation"> */}
        <button
          className="intro-button"
          onClick={() => this.setState({ page: this.state.page + 1 })}
        >
          Go to my next step
        </button>
        <p>{`( ${this.state.page + 1} / ${description.length} )`}</p>
        {/* </div> */}
      </div>
    );
  }
}

IntroChallenge.propTypes = {
  challenge: PropTypes.object.isRequired
};

export default IntroChallenge;
