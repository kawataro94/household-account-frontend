import React from 'react';
import { Table } from 'rsuite';

import { YenUnit } from './Units';
import { summaryColumns } from '../looksup';
import { categoryTag, costFont } from './style';

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

const SummaryTable = ({ data, columns = [] }) => {
	return (
		<Table
			height={500}
			data={data}
			bordered
			cellBordered
			headerHeight={80}
			rowHeight={57}
			shouldUpdateScroll={false}
		>
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
			{columns.map((column) => (
				<Column width={100} align="center" fixed="left" key={column.id}>
					<HeaderCell>{column.name}</HeaderCell>
					<Cell>{({ dividedTotal }) => <Cost value={dividedTotal[column.id] || 0} />}</Cell>
				</Column>
			))}
		</Table>
	);
};

export default SummaryTable;
