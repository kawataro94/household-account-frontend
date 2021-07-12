import React, { useState } from 'react';
import { Row, Panel, Nav } from 'rsuite';

import { Divider } from '../../../components';
import { CategoryTable, PlaceTable, TemplateTable } from './table';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="template">テンプレート一覧</Nav.Item>
			<Nav.Item eventKey="category">カテゴリ一覧</Nav.Item>
			<Nav.Item eventKey="place">購入場所一覧</Nav.Item>
		</Nav>
	);
};

const CustomTable = ({ active }) => {
	return (
		<>
			{active === 'template' ? <TemplateTable /> : null}
			{active === 'category' ? <CategoryTable /> : null}
			{active === 'place' ? <PlaceTable /> : null}
		</>
	);
};

const RecordsTables = () => {
	const [active, setActive] = useState('template');
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
