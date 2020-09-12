import React, { useState } from 'react';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';
import { Provider } from './hoc/index';

const Records = () => {
  const [values, setValues] = useState({
    data: [
      {
        id: 1,
        title: 'ひき肉',
        category: '食品',
        date: '2020/08/31',
        paidBy: 'shin',
        cost: 450
      },
      {
        id: 2,
        title: 'アイス',
        category: '食品',
        date: '2020/08/31',
        paidBy: 'mari',
        cost: 2000
      }
    ]
  });
  const { data } = values;

  const createRecord = (record) => {
    setValues({ data: [...data, record] });
  };
  const editRecord = (record, idx) => {
    data.splice(idx, 1, record);
    setValues({ data });
  };
  const recordTableProps = {
    createRecord,
    editRecord
  };

  return (
    <div className='wrap'>
      <Provider value={values}>
        <h2 >Records</h2>
        <Divider height='20' />
        <RecordTable {...recordTableProps} />
        <Divider height='20' />
      </Provider>
    </div>
  );
};

export default Records;