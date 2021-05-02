import React, { useContext } from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, DatePicker, SelectPicker } from 'rsuite';

import { makeCategoryOption, makeMemberOption } from '../../../looksup';
import { DashboardContext } from '../context';

const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
	title: StringType().isRequired('This field is required.'),
	categoryId: NumberType().isRequired('This field is required.'),
	date: DateType().isRequired('This field is required.'),
	paidBy: NumberType().isRequired('This field is required.'),
	cost: NumberType().isRequired('This field is required.'),
});

const CustomField = (props) => {
	const { name, label, accepter, ...rest } = props;
	const autoFocus = name === 'cost' ? true : false;
	return (
		<FormGroup>
			<ControlLabel>{label} </ControlLabel>
			<FormControl name={name} accepter={accepter} {...rest} autoFocus={autoFocus} />
		</FormGroup>
	);
};

const CreateEditForm = (props) => {
	const { formValue, setFormValue } = props;
	const { members, categories } = useContext(DashboardContext);
	const memberOption = makeMemberOption(members);
	const categoryOption = makeCategoryOption(categories);
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
			<CustomField name="cost" label="Cost" accepter={Input} />
			<CustomField
				name="paidBy"
				label="Paid By"
				accepter={SelectPicker}
				data={memberOption}
				value={(formValue || {}).memberId}
				block={true}
			/>
			<CustomField name="title" label="Title" accepter={Input} />
			<CustomField
				name="categoryId"
				label="Category"
				accepter={SelectPicker}
				data={categoryOption}
				block={true}
			/>
			<CustomField name="date" label="Date" accepter={DatePicker} block={true} />
		</Form>
	);
};

export default CreateEditForm;
