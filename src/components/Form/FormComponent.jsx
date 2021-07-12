import React, { useContext } from 'react';
import { FormControl, Input, DatePicker, SelectPicker } from 'rsuite';

import { FormStateContext, FormDispatchContext } from './context';
import { ColorPicker } from './components';
import { actions } from './reducer';

const getAccepter = (type) => {
	switch (type) {
		case 'input':
			return Input;
		case 'select-picker':
			return SelectPicker;
		case 'date-picker':
			return DatePicker;
	}
};

const RsuiteForm = ({ fieldName, fieldType, ...rest }) => {
	const accepter = getAccepter(fieldType);
	return <FormControl name={fieldName} accepter={accepter} {...rest} />;
};

const FormComponents = ({ fieldName, fieldType, ...rest }) => {
	const { formState } = useContext(FormStateContext);
	const { formDispatch } = useContext(FormDispatchContext);

	if (fieldType === 'color-picker') {
		return (
			<ColorPicker
				formState={formState}
				onChange={(value) => formDispatch(actions.updateColorValue(fieldName, value))}
			/>
		);
	}

	return (
		<RsuiteForm
			{...{ fieldName, fieldType, ...rest }}
			onChange={(value) => formDispatch(actions.updateValue(fieldName, value))}
		/>
	);
};

export default FormComponents;
