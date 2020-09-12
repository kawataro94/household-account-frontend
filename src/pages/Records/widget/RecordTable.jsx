import React, { useState } from 'react';
import { Row, Col, Table, Panel, Button } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import CreateEditModal from '../widget/CreateEditModal';
import { withRecord } from '../hoc/index';

const { Column, HeaderCell, Cell } = Table;
const RecordTable = (props) => {
  const { records } = props;
  const [modalState, setModalState] = useState({
    show: false,
    selected: undefined
  });
  const openCreateEditModal = (index) => {
    setModalState({
      show: true,
      selected: index
    });
  };
  const closeCreateEditModal = () => {
    setModalState({
      show: false,
      selected: undefined
    });
  };

  const createButtonProps = {
    buttonText: '追加する',
    onClick: () => openCreateEditModal()
  };
  const createEditModalProps = {
    modalState,
    closeCreateEditModal,
    ...props
  };

  return (
    <Row>
      <Col>
        <SectionTitle title='最近の記録' {...createButtonProps} />
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={500} data={records} rowHeight={57}>
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
            <HeaderCell>払人</HeaderCell>
            <Cell dataKey="member_id" />
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell></HeaderCell>
            <Cell>
              {(_, index) => {
                return (
                  <Button appearance='primary' size="sm" onClick={() => openCreateEditModal(index)}>編集</Button>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
      <CreateEditModal {...createEditModalProps} />
    </Row >
  );
};

export default withRecord(RecordTable);