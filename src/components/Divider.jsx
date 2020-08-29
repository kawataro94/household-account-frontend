
import React from 'react';

const height = (h) => {
  return {
    height: `${h}px`
  };
};

const Divider = ({ height: h }) => {
  return (
    <div style={height(h)} ></div>
  );
};

export default Divider;