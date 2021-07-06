import React, { FC, ReactNode } from 'react';
import { Table as RsuiteTable } from 'rsuite';

type Props = {
	columns: [];
	actions: (index: number) => ReactNode;
	height: number;
};

const { Column, HeaderCell, Cell } = RsuiteTable;

const Table: FC<Props> = (props) => {
	const { columns, actions, height = 400, ...rest } = props;
	const tableColumns = Array.from(columns || []);
	return (
		<RsuiteTable {...{ height, ...rest }}>
			{tableColumns.map((column, idx) => {
				const { header, key, cell } = column;
				return (
					<Column flexGrow={1} minWidth={100} key={idx}>
						<HeaderCell>{header}</HeaderCell>
						{!cell ? <Cell dataKey={key} /> : <Cell>{cell}</Cell>}
					</Column>
				);
			})}
			{actions ? (
				<Column flexGrow={1} minWidth={130} key={'action'}>
					<HeaderCell></HeaderCell>
					<Cell>{(_: unknown, index: number) => actions(index)}</Cell>
				</Column>
			) : null}
		</RsuiteTable>
	);
};

export default Table;
