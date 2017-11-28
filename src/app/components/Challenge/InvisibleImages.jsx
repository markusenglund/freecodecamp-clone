import React, { Component } from "react";
import PropTypes from "prop-types";
// import { fetchChallenge } from "../../actionCreators";

class InvisibleImages extends Component {
  render() {
    const { images } = this.props;
    return (
      <div>
        {images.map(([src, alt], i) => (
          <img key={i} src={src} alt={alt} className="invisible-image" />
        ))}
      </div>
    );
  }
}

InvisibleImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default InvisibleImages;
