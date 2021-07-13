import React, { useState } from 'react';
import { Panel, Nav } from 'rsuite';

import { Divider } from '../../components';
import { CategoryTable, PlaceTable, TemplateTable } from './widget/table';
import { CategoryForm, PlaceForm, TemplateForm } from './widget/form';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="template">テンプレート一覧</Nav.Item>
			<Nav.Item eventKey="category">カテゴリ一覧</Nav.Item>
			<Nav.Item eventKey="place">購入場所一覧</Nav.Item>
		</Nav>
	);
};

const CustomTable = ({ active, ...rest }) => {
	return (
		<Panel bordered>
			{active === 'template' ? <TemplateTable {...rest} /> : null}
			{active === 'category' ? <CategoryTable {...rest} /> : null}
			{active === 'place' ? <PlaceTable {...rest} /> : null}
		</Panel>
	);
};

const CustomForm = ({ active }) => {
	return (
		<>
			{active === 'template' ? <TemplateForm /> : null}
			{active === 'category' ? <CategoryForm /> : null}
			{active === 'place' ? <PlaceForm /> : null}
		</>
	);
};

const Content = ({ active }) => {
	return (
		<>
			<CustomTable active={active} />
			<CustomForm active={active} />
		</>
	);
};

const PageComponent = () => {
	const [active, setActive] = useState('template');
	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};

	return (
		<>
			<CustomNav appearance="subtle" active={active} onSelect={handleSelect} />
			<Divider height="20" />
			<Content active={active} />
		</>
	);
};

export default PageComponent;
