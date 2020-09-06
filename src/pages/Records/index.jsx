import React from 'react';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';
import { Provider } from './hoc/index';

const value = {
  data: [
    {
      id: 1,
      title: 'ひき肉',
      category: '食品',
      date: '2020/08/31',
      member: 'shin',
      cost: 450
    },
    {
      id: 2,
      title: 'アイス',
      category: '食品',
      date: '2020/08/31',
      member: 'mari',
      cost: 2000
    },
    {
      id: 3,
      title: '電気',
      category: '電気代',
      date: '2020/08/31',
      member: 'shin',
      cost: 7500
    },
    {
      id: 4,
      title: 'ガス',
      category: 'ガス代',
      date: '2020/08/31',
      member: 'mari',
      cost: 5500
    },
    {
      id: 5,
      title: 'トイレットペーパー',
      category: '生活用品',
      date: '2020/08/31',
      member: 'mari',
      cost: 500
    }
  ]
};

const Records = () => {
  return (
    <div className='wrap'>
      <Provider value={value}>
        <h2 >Records</h2>
        <Divider height='20' />
        <RecordTable />
        <Divider height='20' />
      </Provider>
    </div>
  );
};

export default Records;