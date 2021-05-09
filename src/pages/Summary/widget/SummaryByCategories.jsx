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

const Category = ({ name, color }) => {
	return (
		<div>
			<span css={categoryTag(color)}>{name}</span>
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
const formatByCategories = reduce(
	(acc, v) => {
		const totalByCategories = merge(acc.totalByCategories, {
			[v.categoryId]: v.total,
		});
		return {
			...acc,
			month: v.month,
			year: v.year,
			total: acc.total + v.total,
			totalByCategories,
		};
	},
	{ total: 0, totalByCategories: {} }
);

const SummaryByCategories = ({ monthlyExpenses, categories }) => {
	const expensesByCategories = pipe(groupByMonth, toArray, map(formatByCategories))(monthlyExpenses);

	return (
		<Table height={500} data={expensesByCategories} bordered cellBordered headerHeight={80}>
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
			{categories.map(({ id, name, color }) => (
				<Column width={100} align="center" fixed="left" key={id}>
					<HeaderCell>
						<Category {...{ name, color }} />
					</HeaderCell>
					<Cell>{({ totalByCategories }) => <Cost value={totalByCategories[id] || 0} />}</Cell>
				</Column>
			))}
		</Table>
	);
};

export default SummaryByCategories;
