import React, { FC, ReactNode } from 'react';

import { flex, content } from './style';

type Props = {
	children: ReactNode;
	hasHeader: boolean;
};

const Center: FC<Props> = ({ children, hasHeader }) => {
	return (
		<div css={flex(hasHeader)}>
			<div css={content}>{children}</div>
		</div>
	);
};

export default Center;
