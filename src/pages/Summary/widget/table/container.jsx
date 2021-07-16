import React, { useMemo } from 'react';
import groupBy from 'ramda.groupby';
import pipe from 'ramda.pipe';
import values from 'ramda.values';
import map from 'ramda.map';
import reduce from 'ramda.reduce';
import merge from 'ramda.merge';

import Component from './component';

const groupByMonth = groupBy((v) => `${v.year}-${v.month}`);
const toArray = values;
const formatter = reduce(
	(acc, v) => {
		const dividedTotal = merge(acc.dividedTotal, {
			[v.memberId]: v.total,
		});
		return {
			...acc,
			month: v.month,
			year: v.year,
			total: acc.total + v.total,
			dividedTotal,
		};
	},
	{ total: 0, dividedTotal: {} }
);
const getSummaryData = pipe(groupByMonth, toArray, map(formatter));

const Container = ({ data = [], columns }) => {
	const summaryData = useMemo(() => getSummaryData(data), [data]);
	const tableProps = useMemo(
		() => ({
			data: summaryData,
			columns,
		}),
		[summaryData, columns]
	);

	return <Component {...tableProps} />;
};

export default Container;
