import React from 'react';

import { Divider } from '../../components';
import { MemberTable } from './widget/table';

const PageComponent = () => {
	return (
		<>
			<h2>Members</h2>
			<Divider height="20" />
			<MemberTable />
		</>
	);
};

export default PageComponent;
