import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./DomChallenge.scss";

class DomChallenge extends Component {
  render() {
    const { description } = this.props;
    return (
      <div>
        <div className="dom-challenge-description">
          {description.map(descriptionHtml => (
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          ))}
        </div>
      </div>
    );
  }
}

DomChallenge.propTypes = {
  description: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => {
  const currentChallengeName = state.router.pathname.split("/")[2];
  const { description } = state.challenges[currentChallengeName];
  return { description };
};

export default connect(mapStateToProps)(DomChallenge);
