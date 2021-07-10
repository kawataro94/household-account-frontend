import React from 'react';
import { FormControl, Input, DatePicker, SelectPicker } from 'rsuite';

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

const FormComponents = (props) => {
	const { fieldName, fieldType, ...rest } = props;
	const accepter = getAccepter(fieldType);

	return <FormControl name={fieldName} accepter={accepter} {...rest} />;
};

export default FormComponents;
