import React from 'react';

import Component from './component';

const Container = ({ data, columns }) => {
	const tableProps = {
		data,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns,
	};

	return <Component {...{ tableProps }} />;
};

export default Container;
