import React, { useState } from 'react';
import { Row, Col, Table, Panel, Button } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import AddModal from '../widget/AddModal';

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    title: 'ひき肉',
    category: '食品',
    date: '2020/08/31',
    member: 'shin',
    cost: 450
  },
  {
    id: 2,
    title: 'アイス',
    category: '食品',
    date: '2020/08/31',
    member: 'mari',
    cost: 2000
  },
  {
    id: 3,
    title: '電気',
    category: '電気代',
    date: '2020/08/31',
    member: 'shin',
    cost: 7500
  },
  {
    id: 4,
    title: 'ガス',
    category: 'ガス代',
    date: '2020/08/31',
    member: 'mari',
    cost: 5500
  },
  {
    id: 5,
    title: 'トイレットペーパー',
    category: '生活用品',
    date: '2020/08/31',
    member: 'mari',
    cost: 500
  }
];

const RecordTable = () => {

  const [show, setShow] = useState(false);
  const openAddModal = () => {
    setShow(true);
    console.log('open');
  };
  const closeAddModal = () => {
    setShow(false);
    console.log('close');
  };

  const addButtonProps = {
    buttonText: '追加する',
    onClick: () => openAddModal()
  };

  const addModalProps = {
    show,
    closeAddModal
  };

  return (
    <Row>
      <Col>
        <SectionTitle title='最近の記録' {...addButtonProps} />
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={280} data={data} rowHeight={57}>
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
            <HeaderCell></HeaderCell>
            <Cell style={{}}>
              {() => {
                return (
                  <div><Button appearance='primary' size="sm">詳細</Button></div>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
      <AddModal {...addModalProps} />
    </Row >
  );
};

export default RecordTable;