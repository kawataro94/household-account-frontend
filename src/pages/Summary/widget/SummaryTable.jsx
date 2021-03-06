import React, { useState, useContext } from 'react';
import { Row, Panel, Nav } from 'rsuite';

import Divider from '../../../components/Divider';
import { SummaryContext } from '../context';
import SummaryByCategories from './SummaryByCategories';
import SummaryByMembers from './SummaryByMembers';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="categories">月ごとの集計</Nav.Item>
			<Nav.Item eventKey="members">メンバーごとの集計</Nav.Item>
		</Nav>
	);
};

const CustomTable = ({ active }) => {
	const { monthlyExpenses, expensesByMembers, members } = useContext(SummaryContext);

	return (
		<>
			{active === 'categories' ? <SummaryByCategories {...{ monthlyExpenses }} /> : null}
			{active === 'members' ? <SummaryByMembers {...{ expensesByMembers, members }} /> : null}
		</>
	);
};

const SummaryTable = () => {
	const [active, setActive] = useState('categories');
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

export default SummaryTable;
