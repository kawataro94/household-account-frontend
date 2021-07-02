import React, { useState, useContext } from 'react';
import { Row, Panel, Nav } from 'rsuite';

import Divider from '../../../components/Divider';
import { RecordsContext } from '../context';
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
	const {
		myProfile,
		members,
		categories,
		places,
		records,
		lendingRecords,
		updateRecords,
		updateLendingRecords,
	} = useContext(RecordsContext);

	return (
		<>
			{active === 'default' ? (
				<RecordTable {...{ myProfile, members, categories, places, records, updateRecords }} />
			) : null}
			{active === 'irregular' ? (
				<LendingRecordTable
					{...{ myProfile, members, categories, places, lendingRecords, updateLendingRecords }}
				/>
			) : null}
		</>
	);
};

const RecordsTables = () => {
	const [active, setActive] = useState('default');
	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};
	return (
		<Row>
			<CustomNav appearance="subtle" active={active} onSelect={handleSelect} />
			<Divider height="20" />
			<Panel bordered>
				<CustomTable active={active} />
			</Panel>
		</Row>
	);
};

export default RecordsTables;
