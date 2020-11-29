import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'rsuite';

import { withCache } from '../hoc/index';
import QuickForm from './QuickForm';

const { Header, Title, Body, Footer } = Modal;
const QuickFormModal = (props) => {
  const { isOpen, template, closeCreateModal, createRecord } = props;
  const [formValue, setFormValue] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { title, category } = template;
    setFormValue({
      title: title || '',
      category: category || '',
      date: new Date,
    });
  }, [template]);

  useEffect(() => {
    const inputValue = Object.values(formValue || {});
    setDisabled(inputValue.length < 3 || !Object.values(formValue || {}).every(v => v !== undefined));
  }, [formValue]);

  const onOk = () => {
    createRecord(formValue);
    closeCreateModal();
  };
  const onCancel = () => {
    closeCreateModal();
  };

  const createFormProps = {
    formValue,
    setFormValue
  };
  const okButtonProps = {
    onClick: () => onOk(),
    appearance: 'primary',
    disabled
  };
  const cancelButtonProps = {
    onClick: () => onCancel(),
    appearance: "subtle"
  };

  return (
    <Modal show={isOpen} onHide={closeCreateModal} size="xs">
      <Header>
        <Title>View</Title>
      </Header>
      <Body>
        <QuickForm {...createFormProps} />
      </Body>
      <Footer>
        <Button {...okButtonProps}>Ok</Button>
        <Button {...cancelButtonProps}>Cancel</Button>
      </Footer>
    </Modal>
  );
};

export default withCache(QuickFormModal);