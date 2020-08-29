import React, { useState } from 'react';
import { Row, Col, Panel, List, FlexboxGrid, Icon, Button, Modal } from 'rsuite';
import Divider from '../../../components/Divider';
import CreateEditForm from './CreateEditForm';

const lineHeight = {
  lineHeight: '39px',
  padding: '0 10px'
};

const lineHeightH5 = {
  lineHeight: '42px',
};

const marginLeft = {
  marginLeft: 10
};

const userInfo = [
  {
    name: 'mari',
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    name: 'shintaro',
    target: 10000,
    paid: 20000,
    left: 10000
  }
];

const AddModal = (props) => {
  const { name, show, closeAddModal } = props;

  const formValue = {
    name
  };

  return (
    <Modal show={show} onHide={closeAddModal} size="xs">
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateEditForm formValue={formValue} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeAddModal} appearance="primary">
          Ok
        </Button>
        <Button onClick={closeAddModal} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const UserList = (props) => {
  const { setName, setShow } = props;

  const edit = (name) => {
    setShow(true);
    setName(name);
  };

  return (
    <List hover>
      {userInfo.map((user, index) => {
        const { name, target, paid, left } = user;
        return (
          <List.Item key={index}>
            <FlexboxGrid>
              <FlexboxGrid.Item
                colspan={6}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  overflow: 'hidden'
                }}
              >
                <div style={lineHeight}>
                  <Icon icon="user-circle-o" size='lg' />
                  <span style={marginLeft}>{name}</span>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={5}>
                <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                  <div>{target}</div>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={5} >
                <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                  <div>{paid}</div>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={5} >
                <div style={lineHeight}>
                  <div>{left}</div>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={3} >
                <Icon icon='pencil' size='lg' style={lineHeight} onClick={() => edit(name)} />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </List.Item>
        );
      })}
    </List>
  );
};

const UserPanel = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const openAddModal = () => {
    setShow(true);
    setName('');
  };

  const closeAddModal = () => {
    setShow(false);
  };

  const addButtonProps = {
    appearance: 'primary',
    size: 'lg',
    onClick: () => openAddModal()
  };

  const userListProps = {
    setName,
    setShow
  };

  const addModalProps = {
    name,
    show,
    closeAddModal,
  };

  return (
    <Row>
      <Col>
        <FlexboxGrid justify='space-between' align='middle'>
          <h5 style={lineHeightH5}>メンバー情報</h5>
          <Button {...addButtonProps}>追加する</Button>
        </FlexboxGrid>
      </Col>
      <Divider height='10' />
      <Col>
        <Panel bordered>
          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={6}
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden'
              }}
            >
              <div style={lineHeight}>
                ユーザー名
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5}>
              <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                <div>今月の出費目標額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                <div>現時点での出費額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div style={lineHeight}>
                <div>今月の使用可能額</div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <UserList {...userListProps} />
        </Panel>
      </Col>
      <AddModal {...addModalProps} />
    </Row >
  );
};

export default UserPanel;