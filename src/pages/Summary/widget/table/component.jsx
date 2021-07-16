import React from 'react';

import { SummaryTable } from '../../../../components';

const Component = ({ data, columns = [] }) => {
	return <SummaryTable data={data} columns={columns} />;
};

export default Component;
