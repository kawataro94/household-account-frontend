import React from 'react';
import { Row, Col, Panel, List, FlexboxGrid, Icon, Button } from 'rsuite';

import Divider from '../../../components/Divider';

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

const UserList = () => {

  return (
    <List hover>
      {userInfo.map((user, index) =>
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
                <span style={marginLeft}>{user.name}</span>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5}>
              <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                <div>{user.target}</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div style={{ padding: '0 10px', lineHeight: '39px' }}>
                <div>{user.paid}</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div style={lineHeight}>
                <div>{user.left}</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={3} >
              <Icon icon='pencil' size='lg' style={lineHeight} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>)}
    </List>
  );
};

const UserPanel = () => {
  return (
    <Row>
      <Col>
        <FlexboxGrid justify='space-between' align='center'>
          <h5 style={lineHeightH5}>メンバー情報</h5>
          <Button appearance="primary" size="lg">追加する</Button>
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
          <UserList />
        </Panel>
      </Col>
    </Row >
  );
};

export default UserPanel;