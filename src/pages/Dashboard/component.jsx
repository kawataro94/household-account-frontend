import React from 'react';
import { FlexboxGrid } from 'rsuite';

import { Divider } from '../../components';
import { GroupInformation, QuickTemplateList } from './widget/board';
import { QuickRecordForm } from './widget/form';
import { RecentRecordTable } from './widget/table';

const PageComponent = () => {
	return (
		<>
			<h2>Dashboard</h2>
			<Divider height="20" />
			<FlexboxGrid justify="space-between">
				<FlexboxGrid.Item className="da-group-info">
					<GroupInformation />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item className="da-template-form">
					<QuickTemplateList />
					<QuickRecordForm />
				</FlexboxGrid.Item>
			</FlexboxGrid>
			<div className="da-record-table">
				<RecentRecordTable />
			</div>
		</>
	);
};

export default PageComponent;
