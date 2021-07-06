import React, { FC } from 'react';
import { yen } from '../style';

type Props = {
	style: string;
};

export const YenUnit: FC<Props> = ({ style }) => {
	return <span css={yen(style)}>円</span>;
};
