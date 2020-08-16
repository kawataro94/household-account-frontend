import React from 'react';
import { FlexboxGrid } from 'rsuite';

import Divider from '../../components/Divider';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';
import RecordTable from './widget/RecordTable';

const Dashboard = () => {
  return (
    <div className='wrap'>
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
    </div>
  );
};

export default Dashboard;