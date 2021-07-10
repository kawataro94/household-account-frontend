import React from 'react';
import { FormGroup, ControlLabel } from 'rsuite';
import FormComponent from './FormComponent';

const CustomField = (props) => {
	const { name, label, type, ...rest } = props;

	return (
		<FormGroup>
			<ControlLabel>{label} </ControlLabel>
			<FormComponent fieldName={name} fieldType={type} {...rest} />
		</FormGroup>
	);
};

export default CustomField;
