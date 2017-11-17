import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Counter = ({ counter, dispatch }) => (
  <div>
    <h1>Counter</h1>
    <button onClick={() => dispatch({ type: "INCREMENT" })}>
      Click the button!
    </button>
    <p>Counter: {counter}</p>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ counter: state.counter });

export default connect(mapStateToProps)(Counter);
