import React, { Suspense } from 'react';

import Divider from '../../components/Divider';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';
import { Provider } from './context';

const Members = () => {
  return (
    <div className='wrap'>
      <h2 >Members</h2>
      <Divider height='20' />
      <Suspense fallback={<p>Loading...</p>}>
        <Provider>
          <GroupPanel />
          <Divider height='20' />
          <UserPanel />
        </Provider>
      </Suspense>
    </div>
  );
};

export default Members;