import React, { useState } from 'react';
import { Row, Col, Table, Panel, Button } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import AddModal from '../widget/AddModal';
import { withRecord } from '../hoc/index';

const { Column, HeaderCell, Cell } = Table;
const RecordTable = (props) => {
  const { data } = props;
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

export default withRecord(RecordTable);