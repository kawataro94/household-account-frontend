import React, { useContext } from 'react';
import { Row, Col, Panel, List, FlexboxGrid, Icon } from 'rsuite';

import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';
import { gridUserItem, lineHeight, marginLeft, padding } from '../style';
import { DashboardContext } from '../context';

const ListItem = (props) => {
  const { account, paidBy } = props;
  return (
    <List.Item>
      <FlexboxGrid>
        <FlexboxGrid.Item
          colspan={12}
          css={gridUserItem}
        >
          <div css={lineHeight(css`padding: 0 20px;`)} >
            <Icon icon="user-circle-o" size='lg' />
            <span css={marginLeft}>{account}</span>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} >
          <div css={lineHeight(css`padding: 0 20px;font-size: 24px;`)}>
            <div css={padding}>{paidBy}<YenUnit style='font-size: 18px;' /></div>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item >
  );
};

const UserList = () => {
  const { members, dailyExpenses } = useContext(DashboardContext);
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

const UserPanel = () => {
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
              css={gridUserItem}
            >
              <div css={lineHeight('padding: 0 10px;')}>
                ユーザー名
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} >
              <div css={lineHeight('padding: 0 10px;')}>
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