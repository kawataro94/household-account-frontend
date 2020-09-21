import React from 'react';
import { FlexboxGrid } from 'rsuite';

import Divider from '../../components/Divider';
import { Provider } from './hoc/index';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';
import RecordTable from './widget/RecordTable';

const Dashboard = () => {
  return (
    <div className='wrap'>
      <Provider>
        <h2 >Dashboard</h2>
        <Divider height='20' />
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={12}>
            <GroupPanel />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <UserPanel />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider height='20' />
        <RecordTable />
      </Provider>
    </div>
  );
};

export default Dashboard;