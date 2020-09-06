import React from 'react';
import { Button, Modal } from 'rsuite';

import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const AddModal = (props) => {
  const { show, closeAddModal } = props;
  const onOk = () => {
    closeAddModal();
  };

  return (
    <Modal show={show} onHide={closeAddModal} size="xs">
      <Header>
        <Title>View</Title>
      </Header>
      <Body>
        <CreateEditForm />
      </Body>
      <Footer>
        <Button onClick={onOk} appearance="primary">
          Ok
        </Button>
        <Button onClick={closeAddModal} appearance="subtle">
          Cancel
        </Button>
      </Footer>
    </Modal>
  );
};

export default AddModal;