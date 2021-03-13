import React from 'react';
import { css } from '@emotion/react';

const height = (h) => css`
	height: ${h}px;
`;

const Divider = ({ height: h }) => {
    return <div css={height(h)}></div>;
};

export default Divider;
