import React from 'react';
import { Row, Col, Table, Panel } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';

const { ColumnGroup, Column, HeaderCell, Cell } = Table;

const SummaryTable = (props) => {
  const { summary } = props;
  return (
    <Row>
      <Col>
        <h5>最近の記録</h5>
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={500} data={summary} bordered cellBordered headerHeight={80}>
          <Column width={100} align="center" fixed='left'>
            <HeaderCell></HeaderCell>
            <Cell dataKey="month" />
          </Column>
          <Column width={100} align="center" fixed='left'>
            <HeaderCell>合計</HeaderCell>
            <Cell dataKey="total" />
          </Column>
          <Column width={130} align="right">
            <HeaderCell>食費</HeaderCell>
            <Cell dataKey="food_expenses" />
          </Column>
          <Column width={130} align="right">
            <HeaderCell>生活用品</HeaderCell>
            <Cell dataKey="living_expenses" />
          </Column>
          <ColumnGroup header="家賃" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="rentMonth" />
            </Column>

            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="rent" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="電気" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="rentMonth" />
            </Column>
            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="electric_bill" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="水道" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="rentMonth" />
            </Column>
            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="water_bill" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="ガス" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="rentMonth" />
            </Column>
            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="gas_bill" />
            </Column>
          </ColumnGroup>
        </Table>
      </Panel>
    </Row>
  );
};

export default withCache(SummaryTable);