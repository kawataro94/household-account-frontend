import React from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, SelectPicker } from 'rsuite';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
	categoryName: StringType().isRequired('This field is required.'),
	title: StringType().isRequired('This field is required.'),
	categoryId: NumberType().isRequired('This field is required.'),
	placeId: NumberType().isRequired('This field is required.'),
});

const getAccepter = (type) => {
	switch (type) {
		case 'input':
			return Input;
		case 'selectPicker':
			return SelectPicker;
	}
};

const CustomField = (props) => {
	const { name, label, type, ...rest } = props;
	const accepter = getAccepter(type);
	return (
		<FormGroup>
			<ControlLabel>{label} </ControlLabel>
			<FormControl name={name} accepter={accepter} {...rest} />
		</FormGroup>
	);
};

const CreateEditForm = (props) => {
	const { formValue, setFormValue, fieldSchema } = props;

	return (
		<Form
			model={model}
			formValue={formValue || {}}
			onChange={(values) => {
				setFormValue(values);
			}}
			checkTrigger="change"
			fluid={true}
		>
			{fieldSchema.map((schema, i) => (
				<CustomField {...schema} key={i} />
			))}
		</Form>
	);
};

export default CreateEditForm;
