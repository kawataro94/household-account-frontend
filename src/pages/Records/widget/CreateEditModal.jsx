import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'rsuite';

import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
  const { data, modalState, closeCreateEditModal, createRecord, editRecord } = props;
  const { show, selected } = modalState;
  const [formValue, setFormValue] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fv = data ? data[selected] : undefined;
    setFormValue(fv);
  }, [data, selected]);

  useEffect(() => {
    const inputValue = Object.values(formValue || {});
    setDisabled(inputValue.length < 5 || !Object.values(formValue || {}).every(v => v));
  }, [formValue]);

  const onOk = () => {
    const createNew = typeof (selected) !== 'number' ? true : false;
    if (createNew) createRecord(formValue);
    if (!createNew) editRecord(formValue, selected);
    closeCreateEditModal();
  };
  const onCancel = () => {
    closeCreateEditModal();
  };

  const createEditFormProps = {
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
    <Modal show={show} onHide={closeCreateEditModal} size="xs">
      <Header>
        <Title>View</Title>
      </Header>
      <Body>
        <CreateEditForm {...createEditFormProps} />
      </Body>
      <Footer>
        <Button {...okButtonProps}>Ok</Button>
        <Button {...cancelButtonProps}>Cancel</Button>
      </Footer>
    </Modal>
  );
};

export default CreateEditModal;