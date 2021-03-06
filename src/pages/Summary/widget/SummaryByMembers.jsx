import React from 'react';
import { Table } from 'rsuite';
import groupBy from 'ramda.groupby';
import pipe from 'ramda.pipe';
import values from 'ramda.values';
import map from 'ramda.map';
import reduce from 'ramda.reduce';
import merge from 'ramda.merge';

import { YenUnit } from '../../../components/Units';
import { summaryColumns } from '../../../looksup';
import { categoryTag, costFont } from '../style';

const { Column, HeaderCell, Cell } = Table;

const Month = ({ month, year }) => (
	<div>
		{year}-{month < 10 && 0}
		{month}
	</div>
);

const Title = ({ name }) => {
	const { label, color } = summaryColumns.find(({ value }) => name === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const Cost = ({ value }) => {
	return (
		<>
			<span css={costFont}>{value}</span>
			<YenUnit style="font-size: 12px;" />
		</>
	);
};

const groupByMonth = groupBy((v) => `${v.year}-${v.month}`);
const toArray = values;
const formatByMembers = reduce(
	(acc, v) => {
		const totalByMembers = merge(acc.totalByMembers, {
			[v.member_id]: v.total,
		});
		return {
			...acc,
			month: v.month,
			year: v.year,
			total: acc.total + v.total,
			totalByMembers,
		};
	},
	{ total: 0, totalByMembers: {} }
);

const SummaryByMembers = ({ expensesByMembers: e, members }) => {
	const expensesByMembers = pipe(groupByMonth, toArray, map(formatByMembers))(e);

	return (
		<Table height={500} data={expensesByMembers} bordered cellBordered headerHeight={80}>
			<Column width={100} align="center" fixed="left">
				<HeaderCell></HeaderCell>
				<Cell>{({ month, year }) => <Month {...{ month, year }} />}</Cell>
			</Column>
			<Column width={100} align="center" fixed="left">
				<HeaderCell>
					<Title name="total" />
				</HeaderCell>
				<Cell>
					{({ total }) => (
						<strong>
							<Cost value={total} />
						</strong>
					)}
				</Cell>
			</Column>
			{members.map(({ id, account }) => (
				<Column width={100} align="center" fixed="left" key={id}>
					<HeaderCell>{account}</HeaderCell>
					<Cell>{({ totalByMembers }) => <Cost value={totalByMembers[id] || 0} />}</Cell>
				</Column>
			))}
		</Table>
	);
};

export default SummaryByMembers;
