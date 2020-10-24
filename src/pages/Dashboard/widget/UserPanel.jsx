import React from 'react';
import { Row, Col, Panel, List, FlexboxGrid, Icon } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';

const lineHeight = (style) => ({
  lineHeight: '39px',
  ...style
});

const marginLeft = {
  marginLeft: 10
};

const ListItem = (props) => {
  const { account, paidBy } = props;
  return (
    <List.Item>
      <FlexboxGrid>
        <FlexboxGrid.Item
          colspan={12}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}
        >
          <div style={lineHeight({ padding: '0 20px' })} >
            <Icon icon="user-circle-o" size='lg' />
            <span style={marginLeft}>{account}</span>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} >
          <div style={lineHeight({ padding: '0 20px', fontSize: '24px' })}>
            <div style={{ padding: '0 20px' }}>{paidBy}<YenUnit style={{ fontSize: '18px' }} /></div>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item >
  );
};

const UserList = (props) => {
  const { members, dailyExpenses } = props;
  const limited = members.slice(0, 2);

  return (
    <List hover>
      {limited.map((member, index) => {
        const paidBy = dailyExpenses.filter(({ member_id }) => Number(member_id) === member.id).reduce((pre, current) => pre + Number(current.total), 0);
        return <ListItem account={member.account} paidBy={paidBy} key={index} />;
      })}
    </List>
  );
};

const UserPanel = (props) => {
  const { members, dailyExpenses } = props;
  return (
    <Row>
      <Col>
        <h5>メンバー情報</h5>
      </Col>
      <Divider height='10' />
      <Col>
        <Panel bordered>
          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={12}
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden'
              }}
            >
              <div style={lineHeight({ padding: '0 10px' })}>
                ユーザー名
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} >
              <div style={lineHeight({ padding: '0 10px' })}>
                <div>今月の使用額</div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <UserList members={members} dailyExpenses={dailyExpenses} />
        </Panel>
      </Col>
    </Row >
  );
};

export default withCache(UserPanel);