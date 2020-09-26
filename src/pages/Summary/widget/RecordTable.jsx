import React from 'react';
import { Row, Col, Table, Panel } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';

const { ColumnGroup, Column, HeaderCell, Cell } = Table;

const data = [
  {
    syokuhi: 30000,
    seikatsu: 20000,
    shiharai: '2020/7',
    yachinMonth: '7月分',
    yachinCost: 10000,
    denki: 10000,
    suido: 10000,
    gasu: 10000,
    total: 1000000
  },
  {
    syokuhi: 50000,
    seikatsu: 25000,
    shiharai: '2020/8',
    yachinMonth: '8月分',
    yachinCost: 10000,
    denki: 10000,
    suido: 10000,
    gasu: 10000,
    total: 2000000
  }
];

const RecordTable = () => {
  return (
    <Row>
      <Col>
        <h5>最近の記録</h5>
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={280} data={data} bordered cellBordered headerHeight={80}>
          <Column width={100} align="center" fixed='left'>
            <HeaderCell></HeaderCell>
            <Cell dataKey="shiharai" />
          </Column>
          <Column width={100} align="center" fixed='left'>
            <HeaderCell>合計</HeaderCell>
            <Cell dataKey="total" />
          </Column>
          <Column width={130} align="right">
            <HeaderCell>食費</HeaderCell>
            <Cell dataKey="syokuhi" />
          </Column>
          <Column width={130} align="right">
            <HeaderCell>生活用品</HeaderCell>
            <Cell dataKey="seikatsu" />
          </Column>
          <ColumnGroup header="家賃" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="yachinMonth" />
            </Column>

            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="yachinCost" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="電気" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="yachinMonth" />
            </Column>
            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="yachinCost" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="水道" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="yachinMonth" />
            </Column>

            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="yachinCost" />
            </Column>
          </ColumnGroup>
          <ColumnGroup header="ガス" align="right">
            <Column width={130} colSpan={2}>
              <HeaderCell>支払い分</HeaderCell>
              <Cell dataKey="yachinMonth" />
            </Column>

            <Column width={130}>
              <HeaderCell>費用</HeaderCell>
              <Cell dataKey="yachinCost" />
            </Column>
          </ColumnGroup>
          {/* <Column width={100} align="center" fixed='left'>
            <HeaderCell>合計</HeaderCell>
            <Cell dataKey="total" />
          </Column> */}
        </Table>
      </Panel>
    </Row>
  );
};

export default withCache(RecordTable);