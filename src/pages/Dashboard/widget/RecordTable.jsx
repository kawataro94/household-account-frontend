import React from 'react';
import { Row, Col, Table, Panel } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';

const { Column, HeaderCell, Cell } = Table;

const RecordTable = (props) => {
  const { members, records } = props;
  const limited = records.slice(0, 5);
  return (
    <Row>
      <Col>
        <h5>最近の記録</h5>
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={280} data={limited} >
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
            <Cell>
              {({ member_id }) => {
                const member = (members || []).find(({ id }) => id === member_id);
                return <span>{member && member.account}</span>;
              }
              }
            </Cell>
          </Column>
        </Table>
      </Panel>
    </Row>
  );
};

export default withCache(RecordTable);