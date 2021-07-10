import React, { useState, useCallback } from 'react';
import { Row, Panel, Nav } from 'rsuite';

import Divider from '../../../components/Divider';
import RecordTable from './RecordTable';
import LendingRecordTable from './LendingRecordTable';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="default">記録一覧</Nav.Item>
			<Nav.Item eventKey="irregular">貸付記録一覧</Nav.Item>
		</Nav>
	);
};

const CustomTable = ({ active }) => {
	return (
		<>
			{active === 'default' ? <RecordTable /> : null}
			{active === 'irregular' ? <LendingRecordTable /> : null}
		</>
	);
};

const RecordTables = () => {
	const [active, setActive] = useState('default');
	const onSelect = useCallback((activeKey) => setActive(activeKey), []);

	return (
		<Row>
			<CustomNav appearance="subtle" active={active} onSelect={onSelect} />
			<Divider height="20" />
			<Panel bordered>
				<CustomTable active={active} />
			</Panel>
		</Row>
	);
};

export default RecordTables;
