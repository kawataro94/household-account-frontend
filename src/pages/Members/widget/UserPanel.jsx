import React, { useState, useEffect } from 'react';
import { Row, Col, Panel, List, FlexboxGrid, Icon, Button, Modal } from 'rsuite';
import axios from 'axios';

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
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  },
  {
    target: 10000,
    paid: 20000,
    left: 10000
  }
];

const AddModal = (props) => {
  const { selected, setSelected, show, closeAddModal } = props;
  const { id, account } = selected;
  const formValue = {
    name: account
  };

  const params = {
    password: "password",
    group_id: "1",
    account: account,
    balance: "100"
  };

  const onOk = () => {
    if (!id) {
      axios
        .post(`http://localhost:8000/member/members`, params)
        .catch((e) => {
          console.log(e, 'post error');
        })
        .finally(closeAddModal);
      return;
    }

    axios
      .patch(`http://localhost:8000/member/members/${id}`, params)
      .catch((e) => {
        console.log(e, 'patch error');
      })
      .finally(closeAddModal);
  };

  return (
    <Modal show={show} onHide={closeAddModal} size="xs">
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateEditForm formValue={formValue} selected={selected} setSelected={setSelected} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onOk} appearance="primary">
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
  const { setSelected, show, setShow } = props;
  const [members, setMembers] = useState([]);

  const edit = (id, name) => {
    setShow(true);
    setSelected({ id, account: name });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/member/members', {})
      .then(({ data }) => {
        setMembers(data);
      },
      )
      .catch((e) => {
        console.log(e, 'get error');
      });
  }, [show]);

  return (
    <List hover>
      {members.map((member, index) => {
        const { id, account } = member;
        const { target, paid, left } = userInfo[index];
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
                  <span style={marginLeft}>{account}</span>
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
                <Icon icon='pencil' size='lg' style={lineHeight} onClick={() => edit(id, account)} />
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
  const [selected, setSelected] = useState({});

  const openAddModal = () => {
    setShow(true);
    setSelected({});
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
    selected,
    setSelected,
    show,
    setShow
  };

  const addModalProps = {
    selected,
    setSelected,
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
                <div>今月の使用額</div>
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