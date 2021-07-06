import React, { FC } from 'react';
import { css } from '@emotion/react';

type Props = {
	height: number;
};

const height = (h: number) => css`
	height: ${h}px;
`;

const Divider: FC<Props> = ({ height: h }) => {
	return <div css={height(h)}></div>;
};

export default Divider;
