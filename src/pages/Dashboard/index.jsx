import React from 'react';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';
import RecordTable from './widget/RecordTable';
import { FlexboxGrid } from 'rsuite';

const divider = {
  height: '20px'
};

const wrap = {
  width: '100%',
  padding: '20px 50px'
};

const Dashboard = () => {
  return (
    <div style={wrap}>
      <h2 >Dashboard</h2>
      <div style={divider} ></div>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={12}>
          <GroupPanel />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <UserPanel />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <div style={divider} ></div>
      <RecordTable />
    </div>
  );
};

export default Dashboard;