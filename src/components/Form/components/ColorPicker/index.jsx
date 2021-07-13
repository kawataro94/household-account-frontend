import React from 'react';
import { TwitterPicker } from 'react-color';

import { colorOption } from '../../../../looksup';
import { base } from './style';

const ColorPicker = ({ formState, onChange }) => {
	return (
		<div>
			<div>
				<div css={base(formState?.color)} />
			</div>
			<TwitterPicker colors={colorOption} onChange={onChange} />
		</div>
	);
};

export default ColorPicker;
