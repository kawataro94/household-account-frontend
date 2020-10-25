import React, { useState } from 'react';
import { Row, Col, Table, Panel, Button } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import { YenUnit } from '../../../components/Units';
import { categoryOption } from '../../../looksup';
import { withRecord } from '../hoc/index';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';

const { Column, HeaderCell, Cell } = Table;

const Category = ({ category }) => {
  const { label, color } = (categoryOption.find(({ value }) => category === value) || {});
  return <div><span style={{ backgroundColor: color, padding: '4px 10px', borderRadius: 4 }}>{label}</span></div>;
};

const Cost = ({ cost }) => <span>{cost}<YenUnit /></span>;

const MemberName = ({ members, member_id }) => {
  const member = (members || []).find(({ id }) => id === member_id);
  return <span>{member && member.account}</span>;
};

const Actions = ({ index, openConfirm, openCreateEditModal }) => (
  <>
    <Button appearance='primary' size="sm" onClick={() => openCreateEditModal(index)}>編集</Button>
    <Button color="red" size="sm" onClick={() => openConfirm(index)} style={{ marginLeft: 10 }} >削除</Button>
  </>
);

const RecordTable = (props) => {
  const { records, members, deleteRecord, isLoading } = props;
  const [modalState, setModalState] = useState({
    show: false,
    selected: null
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const [selected, setSelected] = useState(null);

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

  const openConfirm = (index) => {
    setIsConfirm(true);
    setSelected(index);
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

  const confirmProps = {
    show: isConfirm,
    selected,
    onOk: (index) => {
      deleteRecord(index);
      setIsConfirm(false);
    },
    onCancel: () => setIsConfirm(false)
  };

  return (
    <Row>
      <Col>
        <SectionTitle title='記録一覧' {...createButtonProps} />
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table height={520} data={records} rowHeight={57} shouldUpdateScroll={false} loading={isLoading}>
          <Column flexGrow={1}>
            <HeaderCell>日付</HeaderCell>
            <Cell dataKey="date" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>タイトル</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>カテゴリ</HeaderCell>
            <Cell dataKey="category">
              {({ category }) => <Category {...{ category }} />}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>コスト</HeaderCell>
            <Cell dataKey="cost">
              {({ cost }) => <Cost {...{ cost }} />}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>支払った人</HeaderCell>
            <Cell>{({ member_id }) => <MemberName {...{ members, member_id }} />}</Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell></HeaderCell>
            <Cell>{(_, index) => <Actions {...{ index, deleteRecord, openConfirm, openCreateEditModal }} />}</Cell>
          </Column>
        </Table>
      </Panel>
      <CreateEditModal {...createEditModalProps} />
      <ConfirmModal {...confirmProps} />
    </Row >
  );
};

export default withRecord(RecordTable);