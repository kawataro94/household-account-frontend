import React, { useState } from 'react';
import { Row, Table, Panel, Nav } from 'rsuite';

import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';
import { summaryColumns } from '../../../looksup';
import { withCache } from '../hoc/index';

const { ColumnGroup, Column, HeaderCell, Cell } = Table;
const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect}>
      <Nav.Item eventKey="monthly">月ごとの集計</Nav.Item>
      <Nav.Item eventKey="members">メンバーごとの集計</Nav.Item>
      <Nav.Item eventKey="stores">購入場所ごとの集計</Nav.Item>
    </Nav>
  );
};

const Title = ({ name }) => {
  const { label, color } = (summaryColumns.find(({ value }) => name === value) || {});
  return <div><span style={{ backgroundColor: color, padding: '4px 10px', borderRadius: 4 }}>{label}</span></div>;
};

const Cost = ({ value }) => {
  return (
    <><span style={{ fontSize: 16 }}>{value}</span><YenUnit style={{ fontSize: 12 }} /></>
  );
};

const SummaryTable = (props) => {
  const { summary } = props;

  const [active, setActive] = useState('news');
  const handleSelect = (activeKey) => {
    setActive(activeKey);
  };
  return (
    <Row>
      <CustomNav appearance="subtle" active={active} onSelect={handleSelect} />
      <Divider height='20' />
      <Panel bordered>
        <Table height={500} data={summary} bordered cellBordered headerHeight={80}>
          <Column width={100} align="center" fixed='left'>
            <HeaderCell></HeaderCell>
            <Cell dataKey="month" />
          </Column>
          <Column width={100} align="center" fixed='left'>
            {/* <HeaderCell></HeaderCell> */}
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
        </Table>
      </Panel>
    </Row>
  );
};

export default withCache(SummaryTable);