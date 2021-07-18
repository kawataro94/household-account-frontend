import React from 'react';
import { Panel } from 'rsuite';

import { Divider, Table } from '../../../../components';

const Component = ({ tableProps }) => {
	return (
		<>
			<h5>最近の記録</h5>
			<Divider height="10" />
			<Panel bordered>
				<Table {...tableProps} />
			</Panel>
		</>
	);
};

export default Component;
