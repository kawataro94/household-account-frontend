import React from 'react';
import { FlexboxGrid } from 'rsuite';

import { Button, Divider, Table } from '../../../../../components';
import ConfirmModal from '../../ConfirmModal';

const Component = ({ tableProps, confirmProps, openCreateModal }) => {
	return (
		<>
			<FlexboxGrid justify="end" align="middle">
				<Button onClick={openCreateModal}>追加する</Button>
			</FlexboxGrid>
			<Divider height="10" />
			<Table {...tableProps} />
			<ConfirmModal {...confirmProps} />
		</>
	);
};

export default Component;
