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
      <div>
        <img
          src={description[page][0]}
          alt={description[page][1]}
          className="info-image"
        />
        <h2>{description[page][2]}</h2>
        <button onClick={() => this.setState({ page: this.state.page + 1 })}>
          Go to the next stuff
        </button>
      </div>
    );
  }
}

IntroChallenge.propTypes = {
  challenge: PropTypes.object.isRequired
};

export default IntroChallenge;
