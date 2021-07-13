import React, { useContext, useEffect } from 'react';
import { Form as RsuiteForm } from 'rsuite';
import CustomField from './CustomeField';

import { FormStateContext, FormDispatchContext } from './context';
import { actions } from './reducer';

const Form = (props) => {
	const { initialValue, fieldSchema, model } = props;

	const { formState } = useContext(FormStateContext);
	const { formDispatch } = useContext(FormDispatchContext);

	useEffect(() => {
		formDispatch(actions.setFieldValues(initialValue));
	}, [initialValue]);

	return (
		<RsuiteForm model={model} formValue={formState} checkTrigger="change" fluid={true}>
			{fieldSchema.map((schema, i) => (
				<CustomField {...schema} key={i} />
			))}
		</RsuiteForm>
	);
};

export default Form;
