import React, { FC } from 'react';
import { FlexboxGrid, Button } from 'rsuite';
import { lineHeightH5 } from './style';

type Props = {
	title: string;
	buttonText: string;
	onClick: () => void;
};

const SectionTitle: FC<Props> = (props) => {
	const { title, buttonText, onClick } = props;

	return (
		<FlexboxGrid justify="space-between" align="middle">
			<h5 css={lineHeightH5}>{title}</h5>
			{buttonText ? <Button appearance="primary" size="lg" text={buttonText} onClick={onClick} /> : null}
		</FlexboxGrid>
	);
};

export default SectionTitle;
