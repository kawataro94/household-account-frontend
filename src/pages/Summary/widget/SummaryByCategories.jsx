import React from 'react';
import { Table } from 'rsuite';

import { YenUnit } from '../../../components/Units';
import { summaryColumns } from '../../../looksup';
import { categoryTag, costFont } from '../style';

const { ColumnGroup, Column, HeaderCell, Cell } = Table;

const Month = ({ month, year }) => <div>{year}-{month < 10 && 0}{month}</div>;

const Title = ({ name }) => {
  const { label, color } = (summaryColumns.find(({ value }) => name === value) || {});
  return <div><span css={categoryTag(color)}>{label}</span></div>;
};

const Cost = ({ value }) => {
  return (
    <><span css={costFont}>{value}</span><YenUnit style='font-size: 12px;' /></>
  );
};

const SummaryByCategories = ({ monthlyExpenses }) => {

  return (
    <Table height={500} data={monthlyExpenses} bordered cellBordered headerHeight={80}>
      <Column width={100} align="center" fixed='left'>
        <HeaderCell></HeaderCell>
        <Cell>{({ month, year }) => <Month {...{ month, year }} />}</Cell>
      </Column>
      <Column width={100} align="center" fixed='left'>
        <HeaderCell><Title name='total' /></HeaderCell>
        <Cell>{({ total }) => <strong><Cost value={total} /></strong>}</Cell>
      </Column>
      <Column width={130} align="right">
        <HeaderCell><Title name='food_expenses' /></HeaderCell>
        <Cell>{({ food_expenses }) => <Cost value={food_expenses} />}</Cell>
      </Column>
      <Column width={130} align="right">
        <HeaderCell><Title name='living_expenses' /></HeaderCell>
        <Cell>{({ living_expenses }) => <Cost value={living_expenses} />}</Cell>
      </Column>
      <ColumnGroup header={<Title name='rent' />} align="right">
        <Column width={130} colSpan={2}>
          <HeaderCell>支払い分</HeaderCell>
          <Cell dataKey="rentMonth" />
        </Column>
        <Column width={130}>
          <HeaderCell>費用</HeaderCell>
          <Cell>{({ rent }) => <Cost value={rent} />}</Cell>
        </Column>
      </ColumnGroup>
      <ColumnGroup header={<Title name='electric_bill' />} align="right">
        <Column width={130} colSpan={2}>
          <HeaderCell>支払い分</HeaderCell>
          <Cell dataKey="rentMonth" />
        </Column>
        <Column width={130}>
          <HeaderCell>費用</HeaderCell>
          <Cell>{({ electric_bill }) => <Cost value={electric_bill} />}</Cell>
        </Column>
      </ColumnGroup>
      <ColumnGroup header={<Title name='water_bill' />} align="right">
        <Column width={130} colSpan={2}>
          <HeaderCell>支払い分</HeaderCell>
          <Cell dataKey="rentMonth" />
        </Column>
        <Column width={130}>
          <HeaderCell>費用</HeaderCell>
          <Cell>{({ water_bill }) => <Cost value={water_bill} />}</Cell>
        </Column>
      </ColumnGroup>
      <ColumnGroup header={<Title name='gas_bill' />} align="right">
        <Column width={130} colSpan={2}>
          <HeaderCell>支払い分</HeaderCell>
          <Cell dataKey="rentMonth" />
        </Column>
        <Column width={130}>
          <HeaderCell>費用</HeaderCell>
          <Cell>{({ gas_bill }) => <Cost value={gas_bill} />}</Cell>
        </Column>
      </ColumnGroup>
      <Column width={130} align="right">
        <HeaderCell><Title name='others' /></HeaderCell>
        <Cell>{({ others }) => <Cost value={others} />}</Cell>
      </Column>
    </Table>
  );
};

export default SummaryByCategories;