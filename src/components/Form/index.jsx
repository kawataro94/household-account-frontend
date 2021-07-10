import React from 'react';
import { Form as RsuiteForm } from 'rsuite';
import CustomField from './CustomeField';

const Form = (props) => {
	const { formValue, setFormValue, fieldSchema, model } = props;

	return (
		<RsuiteForm
			model={model}
			formValue={formValue || {}}
			onChange={(values) => {
				setFormValue(values);
			}}
			checkTrigger="change"
			fluid={true}
		>
			{fieldSchema.map((schema, i) => (
				<CustomField {...schema} key={i} formValue={formValue} />
			))}
		</RsuiteForm>
	);
};

export default Form;
