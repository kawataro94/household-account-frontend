import React from 'react';
import { TwitterPicker } from 'react-color'
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, SelectPicker } from 'rsuite';
import { colorOption } from '../../../looksup'
import { css } from '@emotion/react';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
	categoryName: StringType().isRequired('This field is required.'),
	title: StringType().isRequired('This field is required.'),
	categoryId: NumberType().isRequired('This field is required.'),
	placeId: NumberType().isRequired('This field is required.'),
});

const colorStyle = (c) => css`
	width: 200px;
	height: 30px;
	margin-bottom: 10px;
	border-radius: 6px;
	background-color: ${c};
`

const ColorPicker = ({ formValue, setFormValue }) => {
	const handleChange = (c) => {
		setFormValue((state) => ({ ...state, color: c.hex }))
	};

	return (
		<div>
        	<div>
          		<div css={colorStyle(formValue?.color)} />
        	</div>
          <TwitterPicker colors={colorOption} onChange={handleChange} />
      	</div>
	)
}

const getAccepter = (type) => {
	switch (type) {
		case 'input':
			return Input;
		case 'selectPicker':
			return SelectPicker;
		case 'colorPicker':
			return;
	}
};

const CustomField = (props) => {
	const { name, label, type, setFormValue, formValue, ...rest } = props;
	const accepter = getAccepter(type);

	if (type === 'colorPicker') {
		return (
			<FormGroup>
				<ControlLabel>{label} </ControlLabel>
				<ColorPicker setFormValue={setFormValue} formValue={formValue} />
			</FormGroup>
		)
	}

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
				<CustomField {...schema} key={i} setFormValue={setFormValue} formValue={formValue} />
			))}
		</Form>
	);
};

export default CreateEditForm;
