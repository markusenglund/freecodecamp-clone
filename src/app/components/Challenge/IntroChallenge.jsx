import React, { Component } from "react";
import PropTypes from "prop-types";
import IntroChallengePage from "./IntroChallengePage";

// import { fetchChallenge } from "../../actionCreators";

class IntroChallenge extends Component {
  // constructor() {
  //   super();
  //   this.state = { pageIndex: 0 };
  // }
  render() {
    const { description } = this.props.challenge;
    // const { pageIndex } = this.state;
    return (
      <div>
        {description.map((page, i, array) => (
          <IntroChallengePage
            page={page}
            pageIndex={i}
            key={page[0]}
            length={array.length}
          />
        ))}
      </div>
    );
  }
}

IntroChallenge.propTypes = {
  challenge: PropTypes.shape({ description: PropTypes.array }).isRequired
};

export default IntroChallenge;
