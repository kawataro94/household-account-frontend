import React, { Suspense } from 'react';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';

import { Provider } from './context';

const Records = () => {

  return (
    <div className='wrap'>
      <h2 >Records</h2>
      <Divider height='20' />
      <Suspense fallback={<p>Loading ...</p>}>
        <Provider>
          <RecordTable />
        </Provider>
      </Suspense>
      <Divider height='20' />
    </div>
  );
};

export default Records;