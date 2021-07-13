import React from 'react';

import { Modal as FormModal, Form as Content } from '../../../../../components';

const Component = ({ onSubmit, createEditFormProps }) => {
	return (
		<FormModal onSubmit={onSubmit}>
			<Content {...createEditFormProps} />
		</FormModal>
	);
};

export default Component;
