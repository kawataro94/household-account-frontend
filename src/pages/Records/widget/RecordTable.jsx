import React, { useState } from 'react';
import { Row, Col, Table, Panel, Button, Icon } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import CreateEditModal from '../widget/CreateEditModal';
import { withRecord } from '../hoc/index';

const { Column, HeaderCell, Cell } = Table;
const RecordTable = (props) => {
  const { records, members, deleteRecord } = props;
  const [modalState, setModalState] = useState({
    show: false,
    selected: null
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
      selected: null
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
        <Table height={520} data={records} rowHeight={57} shouldUpdateScroll={false}>
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
            <Cell>
              {({ member_id }) => {
                const member = (members || []).find(({ id }) => id === member_id);
                return <span>{member && member.account}</span>;
              }
              }
            </Cell>
          </Column>
          <Column flexGrow={1} resizable>
            <HeaderCell></HeaderCell>
            <Cell>
              {(_, index) => {
                return (
                  <>
                    <Button appearance='primary' size="sm" onClick={() => openCreateEditModal(index)}>編集</Button>
                    <span><Icon icon='trash-o' size="lg" onClick={() => deleteRecord(index)} style={{ marginLeft: 10 }} /></span>
                  </>
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