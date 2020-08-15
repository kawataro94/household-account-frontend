import React from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

const divider = {
  height: '10px'
};

const lineHeight = {
  lineHeight: '39px'
};

const GroupPanel = () => {
  return (
    <Row>
      <Col>
        <h5>グループ情報</h5>
      </Col>
      <div style={divider} ></div>
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
        </Panel>
      </Col>
    </Row >
  );
};

export default GroupPanel;