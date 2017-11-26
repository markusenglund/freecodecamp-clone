import React, { Component } from "react";
import PropTypes from "prop-types";
// import { fetchChallenge } from "../../actionCreators";

class IntroChallengePage extends Component {
  // constructor() {
  //   super();
  //   // this.state = { page: 0 };
  // }
  render() {
    // const { description } = this.props.challenge;
    // const { page } = this.state;
    const { page, pageIndex, length } = this.props;
    return (
      <div className="intro-challenge">
        <img src={page[0]} alt={page[1]} className="intro-image" />
        <p className="intro-text">{page[2]}</p>
        {/* <div className="intro-navigation"> */}
        <button
          className="intro-button"
          // onClick={() => this.setState({ page: this.state.page + 1 })}
        >
          Go to my next step
        </button>
        <p>{`( ${pageIndex + 1} / ${length} )`}</p>
        {/* </div> */}
      </div>
    );
  }
}

IntroChallengePage.propTypes = {
  page: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default IntroChallengePage;
