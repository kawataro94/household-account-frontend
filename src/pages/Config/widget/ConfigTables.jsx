import React, { useState, useContext } from 'react';
import { Row, Panel, Nav, FlexboxGrid } from 'rsuite';

import { Divider, Button } from '../../../components';
import { ModalContext } from '../../../components/Modal/context';
import { actions } from '../../../components/Modal/reducer';
import { CategoryTable, PlaceTable, TemplateTable } from './table';
import { CategoryForm, PlaceForm, TemplateForm } from './form';

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
		<>
			{active === 'template' ? <TemplateTable {...rest} /> : null}
			{active === 'category' ? <CategoryTable {...rest} /> : null}
			{active === 'place' ? <PlaceTable {...rest} /> : null}
		</>
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

const RecordsTables = () => {
	const [active, setActive] = useState('template');
	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};

	const { dispatch } = useContext(ModalContext);
	const openModal = () => {
		dispatch(actions.openCreateModal());
	};

	return (
		<Row>
			<CustomNav appearance="subtle" active={active} onSelect={handleSelect} />
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

export default RecordsTables;
