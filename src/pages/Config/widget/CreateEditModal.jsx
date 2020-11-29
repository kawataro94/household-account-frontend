import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'rsuite';

import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
  const { templates, modalState, closeCreateEditModal, createTemplate } = props;
  const { show, selected } = modalState;
  const [formValue, setFormValue] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fv = templates ? templates[selected] : undefined;
    setFormValue(fv);
  }, [templates, selected]);

  useEffect(() => {
    const inputValue = Object.values(formValue || {});
    setDisabled(inputValue.length < 3 || !Object.values(formValue || {}).every(v => v !== undefined));
  }, [formValue]);

  const onOk = () => {
    const createNew = typeof (selected) !== 'number' ? true : false;
    if (createNew) createTemplate(formValue);
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