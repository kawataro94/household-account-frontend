import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Alert } from 'rsuite';

import { serverUrl } from '../../../.env/resources';
import Divider from '../../components/Divider';
import RecordTable from './widget/RecordTable';
import { Provider } from './hoc/index';

const httpClient = Axios.create({
  withCredentials: true
});

const Records = () => {
  const [records, setRecords] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecords();
    getMembers();
  }, []);

  const delayLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getRecords = () => {
    setIsLoading(true);
    httpClient
      .get(`http://${serverUrl}/member/records`)
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
        delayLoading();
      })
      .finally(() => {
        delayLoading();
      });
  };

  const getMembers = () => {
    httpClient
      .get(`http://${serverUrl}/member/members`)
      .then(({ data }) => {
        setMembers(data);
      })
      .catch((e) => {
        console.log(e, 'get members error');
      });
  };

  const createRecord = record => {
    const params = {
      ...record,
      date: moment(record.date).format('YYYY-MM-DD'),
      member_id: record.paidBy,
      create_by: 2,
      description: "TEST DESCRIPTION",
      fixed: false,
    };

    httpClient
      .post(`http://${serverUrl}/member/records`, params)
      .then(({ data }) => {
        setRecords([...records, data]);
      })
      .catch((e) => {
        console.log(e, 'post error');
      })
      .finally(() => {
        Alert.config({ top: 80 });
        Alert.success('新しいレコードを追加しました');
      });
  };
  const editRecord = (record, idx) => {
    const params = {
      ...record,
      date: moment(record.date).format('YYYY-MM-DD')
    };

    httpClient
      .patch(`http://${serverUrl}/member/records/${record.id}`, params)
      .then(({ data }) => {
        const clone = Array.from(records);
        clone.splice(idx, 1, data);
        setRecords(clone);
      })
      .catch((e) => {
        console.log(e, 'patch error');
      })
      .finally(() => {
        Alert.config({ top: 80 });
        Alert.success('レコードを編集しました');
      });
  };

  const deleteRecord = index => {
    const { id } = records[index];

    httpClient
      .delete(`http://${serverUrl}/member/records/${id}`)
      .then(() => {
        const clone = Array.from(records);
        clone.splice(index, 1);
        setRecords(clone);
      })
      .catch((e) => {
        console.log(e, 'delete error');
      })
      .finally(() => {
        Alert.config({ top: 80 });
        Alert.success('レコードを削除しました');
      });

  };

  const providerData = {
    records,
    members,
    createRecord,
    editRecord,
    deleteRecord,
    isLoading,
  };

  return (
    <div className='wrap'>
      <Provider value={providerData}>
        <h2 >Records</h2>
        <Divider height='20' />
        <RecordTable />
        <Divider height='20' />
      </Provider>
    </div>
  );
};

export default Records;