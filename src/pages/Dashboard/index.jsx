import React, { Suspense } from 'react';
import { FlexboxGrid } from 'rsuite';

import Divider from '../../components/Divider';
import { Provider } from './hoc/index';
import GroupPanel from './widget/GroupPanel';
// import UserPanel from './widget/UserPanel';
import QuickFormPanel from './widget/QuickFormPanel';
import RecordTable from './widget/RecordTable';

import ErrorBoundary from '../../hoc/error-boundary';

const Dashboard = () => {

  return (
    <div className='wrap'>
      <ErrorBoundary>
        <Provider>
          <h2 >Dashboard</h2>
          <Divider height='20' />
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item className='da-group-info'>
              <GroupPanel />
            </FlexboxGrid.Item>
            {/* <FlexboxGrid.Item className='da-member-info'>
            <UserPanel />
          </FlexboxGrid.Item> */}
            <FlexboxGrid.Item className='da-template-form'>
              <Suspense fallback={<p>Loading...</p>}>
                <QuickFormPanel />
              </Suspense>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <div className='da-record-table'>
            <RecordTable />
          </div>
        </Provider>
      </ErrorBoundary>
    </div >
  );
};

export default Dashboard;