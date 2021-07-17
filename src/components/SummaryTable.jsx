import React from 'react';
import { Table } from 'rsuite';

import { YenUnit } from './Units';
import { categoryTag, costFont } from './style';

const { Column, HeaderCell, Cell } = Table;

// eslint-disable-next-line react/display-name
const Month = React.memo(({ month, year }) => {
	return (
		<div>
			{year}-{month < 10 && 0}
			{month}
		</div>
	);
});

// eslint-disable-next-line react/display-name
const Title = React.memo(({ name, color }) => {
	if (!color) return name;

	return (
		<div>
			<span css={categoryTag(color)}>{name}</span>
		</div>
	);
});

// eslint-disable-next-line react/display-name
const Cost = React.memo(({ value }) => {
	return (
		<>
			<span css={costFont}>{value}</span>
			<YenUnit style="font-size: 12px;" />
		</>
	);
});

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
					<Title name="total" color="#e9d5cf" />
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
					<HeaderCell>
						<Title name={column.name} color={column.color} />
					</HeaderCell>
					<Cell>{({ dividedTotal }) => <Cost value={dividedTotal[column.id] || 0} />}</Cell>
				</Column>
			))}
		</Table>
	);
};

export default SummaryTable;
