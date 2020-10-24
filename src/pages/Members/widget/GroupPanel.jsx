import React from 'react';
import { Row, Col, Panel, FlexboxGrid, List, Button } from 'rsuite';

import Divider from '../../../components/Divider';

const lineHeight = {
  lineHeight: '39px'
};

const lineHeightH5 = {
  lineHeight: '42px',
};

const groupLineHeight = {
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
            <div style={groupLineHeight}>
              <div>50000</div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} >
            <div style={groupLineHeight}>
              <div>10000</div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} >
            <div style={groupLineHeight}>
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
        <FlexboxGrid justify='space-between' align='middle'>
          <h5 style={lineHeightH5}>グループ情報</h5>
          <Button appearance="primary" size="lg">編集する</Button>
        </FlexboxGrid>
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
                <div>今月の使用額</div>
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