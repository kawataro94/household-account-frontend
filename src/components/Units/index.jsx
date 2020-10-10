import React from 'react';

const yen = (style) => ({
  marginLeft: 6,
  fontSize: 'inherit',
  ...style
});

export const YenUnit = (style) => {
  return <span style={yen(style)}>円</span>;
};