import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'rsuite';

import { Divider } from '../../components';
import { CategoryTable, PlaceTable, TemplateTable } from './widget/table';
import { CategoryForm, PlaceForm, TemplateForm } from './widget/form';
import Confirmation from '../../components/ConfirmationModal';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="templates">テンプレート一覧</Nav.Item>
			<Nav.Item eventKey="categories">カテゴリ一覧</Nav.Item>
			<Nav.Item eventKey="places">購入場所一覧</Nav.Item>
		</Nav>
	);
};

const Content = ({ active, ...rest }) => {
	return (
		<>
			{active === 'templates' ? (
				<>
					<TemplateTable {...rest} />
					<TemplateForm />
				</>
			) : active === 'categories' ? (
				<>
					<CategoryTable {...rest} />
					<CategoryForm />
				</>
			) : (
				<>
					<PlaceTable {...rest} />
					<PlaceForm />
				</>
			)}
			<Confirmation active={active} />
		</>
	);
};

const PageComponent = () => {
	const { search } = useLocation();
	const history = useHistory();
	const params = useMemo(() => search?.replace('?tab=', '') || 'templates', [search]);
	const handleSelect = (activeKey) => {
		history.replace(`/config?tab=${activeKey}`);
	};

	return (
		<>
			<CustomNav appearance="subtle" active={params} onSelect={handleSelect} />
			<Divider height="20" />
			<Content active={params} />
		</>
	);
};

export default PageComponent;
