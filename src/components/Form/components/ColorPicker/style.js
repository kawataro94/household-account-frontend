import { css } from '@emotion/react';

export const base = (color) => css`
	width: 200px;
	height: 30px;
	margin-bottom: 10px;
	border-radius: 6px;
	background-color: ${color};
`;
