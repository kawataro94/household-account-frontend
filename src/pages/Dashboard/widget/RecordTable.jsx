import React from 'react';
import { Row, Col, Table, Panel } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';
import { categoryOption } from '../../../looksup';

const { Column, HeaderCell, Cell } = Table;

const Category = ({ category }) => {
  const { label } = (categoryOption.find(({ value }) => category === value) || {});
  return <span>{label}</span>;
};

const Cost = ({ cost }) => <span>{cost}<YenUnit /></span>;

const MemberName = ({ members, member_id }) => {
  const member = (members || []).find(({ id }) => id === member_id);
  return <span>{member && member.account}</span>;
};

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
            <Cell dataKey="category">
              {({ category }) => <Category category={category} />}
            </Cell>
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>コスト</HeaderCell>
            <Cell dataKey="cost">
              {({ cost }) => <Cost cost={cost} />}
            </Cell>
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell>支払人</HeaderCell>
            <Cell>{({ member_id }) => <MemberName members={members} member_id={member_id} />}</Cell>
          </Column>
        </Table>
      </Panel>
    </Row>
  );
};

export default withCache(RecordTable);