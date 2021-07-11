import React, { useState, useCallback, useContext } from 'react';
import { Row, Panel, Nav, FlexboxGrid } from 'rsuite';

import { Button, Divider } from '../../../components';
import RecordTable from './RecordTable';
import LendingRecordTable from './LendingRecordTable';
import RecordForm from './RecordForm';
import LendingRecordForm from './LendingRecordForm';

import { ModalContext } from '../../../components/Modal/context';
import { actions } from '../../../components/Modal/reducer';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="default">記録一覧</Nav.Item>
			<Nav.Item eventKey="irregular">貸付記録一覧</Nav.Item>
		</Nav>
	);
};

const CustomTable = ({ active, ...rest }) => {
	return (
		<>
			{active === 'default' ? <RecordTable {...rest} /> : null}
			{active === 'irregular' ? <LendingRecordTable {...rest} /> : null}
		</>
	);
};

const CustomForm = ({ active }) => {
	return (
		<>
			{active === 'default' ? <RecordForm /> : null}
			{active === 'irregular' ? <LendingRecordForm /> : null}
		</>
	);
};

const RecordTables = () => {
	const [active, setActive] = useState('default');
	const onSelect = useCallback((activeKey) => setActive(activeKey), []);

	const { dispatch } = useContext(ModalContext);

	const openModal = () => {
		dispatch(actions.openCreateModal());
	};

	return (
		<Row>
			<CustomNav appearance="subtle" active={active} onSelect={onSelect} />
			<Divider height="20" />
			<Panel bordered>
				<CustomTable active={active}>
					<FlexboxGrid justify="end" align="middle">
						<Button onClick={openModal}>追加する</Button>
					</FlexboxGrid>
					<Divider height="10" />
				</CustomTable>
			</Panel>
			<CustomForm active={active} />
		</Row>
	);
};

export default RecordTables;
