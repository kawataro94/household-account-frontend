import React, { useState } from 'react';
import { Row, Col, Panel, Button } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import Table from '../../../components/Table';
import { categoryOption } from '../../../looksup';
import { withTemplate } from '../hoc/index';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';

const Category = ({ category }) => {
  const { label, color } = (categoryOption.find(({ value }) => category === value) || {});
  return <div><span style={{ backgroundColor: color, padding: '4px 10px', borderRadius: 4 }}>{label}</span></div>;
};

const Actions = ({ index, openConfirm, openCreateEditModal }) => (
  <>
    <Button appearance='primary' size="sm" onClick={() => openCreateEditModal(index)}>編集</Button>
    <Button color="red" size="sm" onClick={() => openConfirm(index)} style={{ marginLeft: 10 }} >削除</Button>
  </>
);

const columns = [
  {
    header: 'テンプレート名',
    key: 'templateName'
  },
  {
    header: 'タイトル',
    key: 'title'
  },
  {
    header: 'カテゴリ',
    cell: function getCategory({ category }) { return <Category {...{ category }} />; }
  }
];

const TemplateTable = (props) => {
  const { templates, deleteTemplate, isLoading } = props;
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
      deleteTemplate(index);
      setIsConfirm(false);
    },
    onCancel: () => setIsConfirm(false)
  };

  const tableProps = {
    height: 520,
    data: templates,
    rowHeight: 57,
    shouldUpdateScroll: false,
    loading: isLoading,
    columns,
    actions: function actionButton(index) { return <Actions {...{ index, openConfirm, openCreateEditModal }} />; }
  };

  return (
    <Row>
      <Col>
        <SectionTitle title='テンプレート一覧' {...createButtonProps} />
      </Col>
      <Divider height='10' />
      <Panel bordered>
        <Table {...tableProps} />
      </Panel>
      <CreateEditModal {...createEditModalProps} />
      <ConfirmModal {...confirmProps} />
    </Row >
  );
};

export default withTemplate(TemplateTable);