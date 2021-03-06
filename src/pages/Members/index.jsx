import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import { Provider } from './context';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';

const Members = () => {
  return (
    <div className='wrap'>
      <ErrorBoundary>
        <h2 >Members</h2>
        <Divider height='20' />
        <Suspense fallback={<Loader />}>
          <Provider>
            <GroupPanel />
            <Divider height='20' />
            <UserPanel />
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Members;