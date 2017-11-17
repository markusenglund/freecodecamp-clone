import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHeadTitle, getHeadDescription } from "../selectors/headSelectors";

const Head = ({ headTitle, headDescription }) => [
  <meta charSet="UTF-8" key="charset" />,
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" key="http-equiv" />,
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
    key="viewport"
  />,
  <meta name="description" content={headDescription} key="description" />,
  <title key="title">{headTitle}</title>,
  <link rel="stylesheet" href="/public/bundle.css" key="stylesheet" />
];

Head.propTypes = {
  headTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  headTitle: getHeadTitle(state),
  headDescription: getHeadDescription(state)
});

export default connect(mapStateToProps)(Head);
