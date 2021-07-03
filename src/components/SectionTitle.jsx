import React from 'react';
import { FlexboxGrid, Button } from 'rsuite';
import { lineHeightH5 } from './style';

const SectionTitle = (props) => {
	const { title, buttonText, onClick } = props;

	const buttonProps = {
		appearance: 'primary',
		size: 'lg',
		onClick,
	};

	return (
		<FlexboxGrid justify="space-between" align="middle">
			<h5 css={lineHeightH5}>{title}</h5>
			{buttonText ? <Button {...buttonProps}>{buttonText}</Button> : null}
		</FlexboxGrid>
	);
};

export default SectionTitle;
