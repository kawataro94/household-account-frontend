import React from 'react';
import { Row, Col, Table, Panel } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const divider = {
  height: '10px'
};

const data = [
  {
    title: 'ひき肉',
    category: '食品',
    date: '2020/08/31',
    member: 'shin',
    cost: 450
  },
  {
    title: 'アイス',
    category: '食品',
    date: '2020/08/31',
    member: 'mari',
    cost: 2000
  },
  {
    title: '電気',
    category: '電気代',
    date: '2020/08/31',
    member: 'shin',
    cost: 7500
  },
  {
    title: 'ガス',
    category: 'ガス代',
    date: '2020/08/31',
    member: 'mari',
    cost: 5500
  },
  {
    title: 'トイレットペーパー',
    category: '生活用品',
    date: '2020/08/31',
    member: 'mari',
    cost: 500
  }
];

const RecordTable = () => {
  return (
    <Row>
      <Col>
        <h5>最近の記録</h5>
      </Col>
      <div style={divider} ></div>
      <Panel bordered>
        <Table height={280} data={data}>
          <Column flexGrow={1} resizable>
            <HeaderCell>日付</HeaderCell>
            <Cell dataKey="date" />
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>タイトル</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>カテゴリ</HeaderCell>
            <Cell dataKey="category" />
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>コスト</HeaderCell>
            <Cell dataKey="cost" />
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>支払人</HeaderCell>
            <Cell dataKey="member" />
          </Column>
        </Table>
      </Panel>
    </Row>
  );
};

export default RecordTable;