import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'rsuite';

import { Divider } from '../../components';
import { SummaryByCategories, SummaryByMembers, LendingSummary } from './widget/table';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="collectionByCategories">カテゴリごとの集計</Nav.Item>
			<Nav.Item eventKey="collectionByMembers">メンバーごとの集計</Nav.Item>
			<Nav.Item eventKey="lendingCollection">貸付集計</Nav.Item>
		</Nav>
	);
};

const Content = ({ active, ...rest }) => {
	return (
		<>
			{active === 'collectionByCategories' ? (
				<SummaryByCategories {...rest} />
			) : active === 'collectionByMembers' ? (
				<SummaryByMembers {...rest} />
			) : (
				<LendingSummary {...rest} />
			)}
		</>
	);
};

const PageComponent = () => {
	const { search } = useLocation();
	const history = useHistory();
	const params = useMemo(() => search?.replace('?tab=', '') || 'collectionByCategories', [search]);
	const handleSelect = (activeKey) => {
		history.replace(`/summary?tab=${activeKey}`);
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
