import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';
import { Provider } from './hoc/index';

const Records = () => {
  const [records, setRecords] = useState({});

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = () => {
    axios
      .get('http://127.0.0.1:8000/member/records', {})
      .then(({ data }) => {
        setRecords(data);
      },
      )
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const createRecord = record => {
    const params = {
      ...record,
      member_id: 2,
      create_by: 2,
      description: "TEST DESCRIPTION",
      fixed: false,
    };

    axios
      .post(`http://127.0.0.1:8000/member/records`, params)
      .then(({ data }) => {
        setRecords([...records, data]);
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };
  const editRecord = (record, idx) => {
    const params = record;
    axios
      .patch(`http://127.0.0.1:8000/member/records/${record.id}`, params)
      .then(({ data }) => {
        const clone = Array.from(records);
        clone.splice(idx, 1, data);
        setRecords(clone);
      })
      .catch((e) => {
        console.log(e, 'patch error');
      });
  };

  const deleteRecord = index => {
    console.log(index);
    console.log(records);
    const { id } = records[index];

    axios
      .delete(`http://127.0.0.1:8000/member/records/${id}`)
      .then(() => {
        const clone = Array.from(records);
        clone.splice(index, 1);
        setRecords(clone);
      })
      .catch((e) => {
        console.log(e, 'delete error');
      });

  };

  const providerData = {
    records
  };
  const recordTableProps = {
    createRecord,
    editRecord,
    deleteRecord
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