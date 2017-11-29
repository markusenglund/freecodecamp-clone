import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHeadTitle, getHeadDescription } from "../selectors/headSelectors";

const Head = ({ headTitle, headDescription }) => 
  <>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <meta name="description" content={headDescription} />
    <title key="title">{headTitle}</title>
    <link rel="stylesheet" href="/public/bundle.css" />
  </>

Head.propTypes = {
  headTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  headTitle: getHeadTitle(state),
  headDescription: getHeadDescription(state)
});

export default connect(mapStateToProps)(Head);
