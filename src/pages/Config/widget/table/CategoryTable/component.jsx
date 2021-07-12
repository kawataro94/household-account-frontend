import React from 'react';

import { Table } from '../../../../../components';
import ConfirmModal from '../../ConfirmModal';

const Component = ({ tableProps, confirmProps, children }) => {
	return (
		<>
			{children}
			<Table {...tableProps} />
			<ConfirmModal {...confirmProps} />
		</>
	);
};

export default Component;
