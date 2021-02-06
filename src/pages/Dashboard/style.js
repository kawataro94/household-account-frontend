import { css } from '@emotion/react';

export const gridItem = css`
  padding: 10px 5px;
`;

export const gridUserItem = css`
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`;

export const categoryTag = (color) => css`
  background-color: ${color};
  padding: 4px 10px;
  border-radius: 4px;
`;

export const lineHeight = (style) => css`
  line-height: 39px;
  ${style}
`;

export const lineHeight2 = css`
  line-height: 106px;
  font-size: 30px;
  padding: 5px 20px;
  text-align: center;
`;

export const marginLeft = css`
  margin-left: 10px;
`;

export const padding = css`
  padding: 0 20px;
`;