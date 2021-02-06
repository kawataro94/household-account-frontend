import React from 'react';

import { flex, content } from './style';

const Center = ({ children }) => {
  return (
    <div css={flex}>
      <div css={content}>
        {children}
      </div>
    </div>
  );
};

export default Center;