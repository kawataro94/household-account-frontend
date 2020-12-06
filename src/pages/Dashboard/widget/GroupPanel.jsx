import React from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';

const lineHeight = {
  lineHeight: '39px'
};

const lineHeight2 = {
  lineHeight: '106px',
  fontSize: '30px',
  padding: '5px 20px',
  textAlign: 'center'
};

const GroupPanel = (props) => {
  const { dailyExpenses } = props;
  const monthlyCost = dailyExpenses.reduce((pre, current) => pre + Number(current.total), 0);
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
            <FlexboxGrid.Item colspan={12} className='target-expense'>
              <div style={lineHeight}>
                <div>今月の出費目標額</div>
              </div>
              <div style={lineHeight2}>
                <div>50000<YenUnit style={{ fontSize: '20px' }} /></div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} className='monthly-expense'>
              <div style={lineHeight}>
                <div>現時点での出費額</div>
              </div>
              <div style={lineHeight2}>
                <div>{monthlyCost}<YenUnit style={{ fontSize: '20px' }} /></div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </Col>
    </Row >
  );
};

export default withCache(GroupPanel);