import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'rsuite';

import { Divider } from '../../components';
import { RecordTable, LendingRecordTable } from './widget/table';
import { RecordForm, LendingRecordForm } from './widget/form';
import Confirmation from '../../components/ConfirmationModal';

const CustomNav = ({ active, onSelect, ...props }) => {
	return (
		<Nav {...props} activeKey={active} onSelect={onSelect}>
			<Nav.Item eventKey="records">記録一覧</Nav.Item>
			<Nav.Item eventKey="lendingRecords">貸付記録一覧</Nav.Item>
		</Nav>
	);
};

const Content = ({ active }) => {
	return (
		<>
			{active === 'records' ? (
				<>
					<RecordTable />
					<RecordForm />
				</>
			) : (
				<>
					<LendingRecordTable />
					<LendingRecordForm />
				</>
			)}
			<Confirmation active={active} />
		</>
	);
};

const PageComponent = () => {
	const { search } = useLocation();
	const history = useHistory();
	const params = useMemo(() => search?.replace('?tab=', '') || 'records', [search]);
	const handleSelect = (activeKey) => {
		history.replace(`/records?tab=${activeKey}`);
	};

	return (
		<>
			<h2>Records</h2>
			<Divider height="20" />
			<CustomNav appearance="subtle" active={params} onSelect={handleSelect} />
			<Divider height="20" />
			<Content active={params} />
		</>
	);
};

export default PageComponent;
