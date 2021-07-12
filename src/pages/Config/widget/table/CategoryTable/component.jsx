import React from 'react';
import { Row, Col, Panel } from 'rsuite';

import { SectionTitle, Table } from '../../../../../components';
import CreateEditModal from '../../CreateEditModal';
import ConfirmModal from '../../ConfirmModal';

const Component = ({ createButtonProps, tableProps, createEditModalProps, confirmProps }) => {
	return (
		<Row>
			<Col>
				<SectionTitle {...createButtonProps} />
			</Col>
			<Panel>
				<Table {...tableProps} />
			</Panel>
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</Row>
	);
};

export default Component;
