import React from 'react';

import { Provider } from './hoc/index';
import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';

const Summary = () => {
  return (
    <div className='wrap'>
      <Provider>
        <h2 >Summary</h2>
        <Divider height='20' />
        <RecordTable />
      </Provider>
    </div>
  );
};

export default Summary;