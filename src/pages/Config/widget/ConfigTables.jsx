import React, { useState, useContext } from 'react';
import { Row, Panel, Nav } from 'rsuite';

import Divider from '../../../components/Divider';
import { ConfigContext } from '../context';
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
	const { templateProps, categoryProps, placeProps } = useContext(ConfigContext);

	return (
		<>
			{active === 'template' ? <TemplateTable {...templateProps} /> : null}
			{active === 'category' ? <CategoryTable {...categoryProps} /> : null}
			{active === 'place' ? <PlaceTable {...placeProps} /> : null}
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
