import React from 'react';
import { Table as RsuiteTable } from 'rsuite';

const { Column, HeaderCell, Cell } = RsuiteTable;

const Table = (props) => {

  const { columns, actions, ...rest } = props;
  const tableColumns = Array.from(columns || []);
  console.log(props, 'props');
  return (
    <RsuiteTable {...rest}>
      {tableColumns.map((column, idx) => {
        const { header, key, cell } = column;
        return (
          <Column flexGrow={1} minWidth={100} key={idx}>
            <HeaderCell>{header}</HeaderCell>
            {!cell ? <Cell dataKey={key} /> : <Cell>{cell}</Cell>}
          </Column>
        );
      })}
      <Column flexGrow={1} minWidth={130} key={'action'}>
        <HeaderCell></HeaderCell>
        <Cell>{(_, index) => actions(index)}</Cell>
      </Column>
    </RsuiteTable >
  );
};

export default Table;