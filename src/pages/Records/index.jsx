import React, { Suspense } from 'react';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';

const Records = () => {

  return (
    <div className='wrap'>
      <h2 >Records</h2>
      <Divider height='20' />
      <Suspense fallback={<p>Loading ...</p>}>
        <RecordTable />
      </Suspense>
      <Divider height='20' />
    </div>
  );
};

export default Records;