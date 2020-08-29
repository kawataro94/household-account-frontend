import React from 'react';
import { Row, Col, Panel, FlexboxGrid, List } from 'rsuite';

import Divider from '../../../components/Divider';

const lineHeight = {
  lineHeight: '39px'
};

const lineHeight2 = {
  lineHeight: '106px',
  fontSize: '24px',
  padding: '0 20px'
};

const GroupInfomation = () => {

  return (
    <List>
      <List.Item style={{ height: 130 }}>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={8}>
            <div style={lineHeight2}>
              <div>50000</div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} >
            <div style={lineHeight2}>
              <div>10000</div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} >
            <div style={lineHeight2}>
              <div>10000</div>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    </List>
  );
};

const GroupPanel = () => {
  return (
    <Row>
      <Col>
        <h5>グループ情報</h5>
      </Col>
      <Divider />
      <Divider height='10' />
      <Col>
        <Panel bordered>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={8}>
              <div style={lineHeight}>
                <div>今月の出費目標額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={8} >
              <div style={lineHeight}>
                <div>現時点での出費額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={8} >
              <div style={lineHeight}>
                <div>今月の使用可能額</div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <GroupInfomation />
        </Panel>
      </Col>
    </Row >
  );
};

export default GroupPanel;