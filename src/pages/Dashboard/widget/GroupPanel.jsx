import React, { useContext } from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';
import { lineHeight, lineHeight2 } from '../style';
import { DashboardContext } from '../context';

const GroupPanel = () => {
  const { dailyExpenses } = useContext(DashboardContext);
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
              <div css={lineHeight()}>
                <div>今月の出費目標額</div>
              </div>
              <div css={lineHeight2}>
                <div>50000<YenUnit style='font-size: 20px;' /></div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} className='monthly-expense'>
              <div css={lineHeight()}>
                <div>現時点での出費額</div>
              </div>
              <div css={lineHeight2}>
                <div>{monthlyCost}<YenUnit style='font-size: 20px;' /></div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </Col>
    </Row >
  );
};

export default GroupPanel;