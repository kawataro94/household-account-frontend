import React from 'react';

import { Provider } from './hoc/index';
import Divider from '../../components/Divider';
import SummaryTable from './widget/SummaryTable';

const Summary = () => {
  return (
    <div className='wrap'>
      <Provider>
        <h2 >Summary</h2>
        <Divider height='20' />
        <SummaryTable />
      </Provider>
    </div>
  );
};

export default Summary;