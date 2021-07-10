import React, { FC, ReactNode } from 'react';
import { Button as RsuiteButton } from 'rsuite';

type Props = {
	children: ReactNode;
	onClick: () => void;
};

const Button: FC<Props> = (props) => {
	const { children, onClick } = props;
	return (
		<RsuiteButton appearance="primary" size="lg" onClick={onClick}>
			{children}
		</RsuiteButton>
	);
};

export default Button;
