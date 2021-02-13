import React, { Suspense } from 'react';

import Divider from '../../components/Divider';
import { Provider } from './context';
import SummaryTable from './widget/SummaryTable';

const Summary = () => {
  return (
    <div className='wrap'>
      <h2 >Summary</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Provider>
          <Divider height='20' />
          <SummaryTable />
        </Provider>
      </Suspense>
    </div>
  );
};

export default Summary;