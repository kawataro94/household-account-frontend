import React from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

import Divider from '../../../components/Divider';
import UserList from './UserList';
import { lineHeight, lineHeightH5, gridItem } from '../style';

const UserPanel = () => {
  return (
    <Row>
      <Col>
        <FlexboxGrid justify='space-between' align='middle'>
          <h5 css={lineHeightH5}>メンバー情報</h5>
        </FlexboxGrid>
      </Col>
      <Divider height='10' />
      <Col>
        <Panel bordered>
          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={6}
              css={gridItem}
            >
              <div css={lineHeight}>
                ユーザー名
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5}>
              <div css={lineHeight}>
                <div>今月の出費目標額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div css={lineHeight}>
                <div>現時点での出費額</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} >
              <div css={lineHeight}>
                <div>今月の使用額</div>
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