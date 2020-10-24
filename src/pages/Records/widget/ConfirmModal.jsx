import React from 'react';
import { Button, Modal, Icon } from 'rsuite';

const { Body, Footer } = Modal;
const ConfirmModal = (props) => {
  const { show, onOk, onCancel, selected } = props;

  const modalProps = {
    show,
    size: "xs",
    closeButton: false
  };

  return (
    <Modal {...modalProps}>
      <Body style={{ padding: '0 20px 20px' }}>
        <p>
          <Icon icon='remind' size='lg' style={{ color: '#faad13', marginRight: 10 }} />
          <span>この操作は取り消すことができません。</span>
        </p>
        <p style={{ textIndent: 29 }}>本当に削除しますか？</p>
      </Body>
      <Footer>
        <Button appearance='primary' onClick={() => onOk(selected)}>Ok</Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </Footer>
    </Modal>
  );
};

export default ConfirmModal;