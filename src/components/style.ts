import { css, SerializedStyles } from '@emotion/react';

type Flex = {
	(param: boolean): SerializedStyles;
};

type Yen = {
	(param: string): SerializedStyles;
};

type categoryTag = {
	(param: string): SerializedStyles;
};

export const flex: Flex = (hasHeader: boolean) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: ${hasHeader ? 'calc(100% - 56px)' : '100vh'};
`;

export const content = css`
	width: 300px;
	background-color: #fff;
	border-radius: 6px;
`;

export const navStyle = css`
	padding: 18px 20px;
	display: inline-block;
	font-size: 16px;
	font-weight: bold;
`;

export const sideNavWidth = css`
	width: 250px;
	height: calc(100vh - 56px);
`;

export const yen: Yen = (style: string) => css`
	margin-left: 6px;
	${style}
`;

export const lineHeightH5 = css`
	line-height: 42px;
`;

export const alignCenter = css`
	text-align: center;
`;

export const actions = css`
	text-align: right;
`;

export const confirmButton = css`
	margin-left: 10px;
`;

export const categoryTag: categoryTag = (color: string) => css`
	background-color: ${color};
	padding: 4px 10px;
	border-radius: 4px;
`;

export const costFont = css`
	font-size: 16px;
`;
