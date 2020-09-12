import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';
import { Provider } from './hoc/index';

const Records = () => {
  const [records, setRecords] = useState({});

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/member/records', {})
      .then(({ data }) => {
        setRecords(data);
      },
      )
      .catch((e) => {
        console.log(e, 'get error');
      });
  }, [editRecord]);

  const createRecord = (record) => {
    setRecords([...records, record]);
  };
  const editRecord = (record, idx) => {
    records.splice(idx, 1, record);
    setRecords(records);
  };

  const providerData = {
    records
  };
  const recordTableProps = {
    createRecord,
    editRecord
  };

  return (
    <div className='wrap'>
      <Provider value={providerData}>
        <h2 >Records</h2>
        <Divider height='20' />
        <RecordTable {...recordTableProps} />
        <Divider height='20' />
      </Provider>
    </div>
  );
};

export default Records;