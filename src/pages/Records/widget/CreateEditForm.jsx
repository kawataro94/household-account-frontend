import React, { useContext } from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, DatePicker, SelectPicker } from 'rsuite';

import { makeMemberOption, makeCategoryOption, makePlaceOption } from '../../../looksup';
import { RecordsContext } from '../context';

const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
	title: StringType().isRequired('This field is required.'),
	category: StringType().isRequired('This field is required.'),
	place: StringType().isRequired('This field is required.'),
	date: DateType().isRequired('This field is required.'),
	paidBy: StringType().isRequired('This field is required.'),
	cost: NumberType().isRequired('This field is required.'),
});

const CustomField = (props) => {
	const { name, label, accepter, ...rest } = props;
	return (
		<FormGroup>
			<ControlLabel>{label} </ControlLabel>
			<FormControl name={name} accepter={accepter} {...rest} />
		</FormGroup>
	);
};

const CreateEditForm = (props) => {
	const { formValue, setFormValue, isCreate } = props;
	const { members, categories, places } = useContext(RecordsContext);
	const memberOption = makeMemberOption(members);
	const categoryOption = makeCategoryOption(categories);
	const placeOption = makePlaceOption(places);

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
			<CustomField name="title" label="Title" accepter={Input} />
			<CustomField
				name="category"
				label={`Category ${!isCreate ? '(readOnly)' : ''}`}
				accepter={SelectPicker}
				data={categoryOption}
				block={true}
				readOnly={!isCreate}
			/>
			<CustomField
				name="date"
				label={`Date ${!isCreate ? '(readOnly)' : ''}`}
				accepter={DatePicker}
				block={true}
				readOnly={!isCreate}
			/>
			<CustomField
				name="place"
				label={`Place ${!isCreate ? '(readOnly)' : ''}`}
				accepter={SelectPicker}
				data={placeOption}
				block={true}
				readOnly={!isCreate}
			/>
			<CustomField
				name="paidBy"
				label={`Paid By ${!isCreate ? '(readOnly)' : ''}`}
				accepter={SelectPicker}
				data={memberOption}
				block={true}
				readOnly={!isCreate}
			/>
			<CustomField name="cost" label="Cost" accepter={Input} />
		</Form>
	);
};

export default CreateEditForm;
