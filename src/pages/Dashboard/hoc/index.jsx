import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Alert } from 'rsuite';

import { serverUrl } from '../../../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

const Cache = React.createContext({});
const Provider = ({ children }) => {
  const [me, setMe] = useState({});
  const [members, setMembers] = useState([]);
  const [records, setRecords] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getMyProfile();
    getMembers();
    getRecords();
    getDailyExpenses();
    getTemplates();
  }, []);

  const getMyProfile = () => {
    httpClient
      .get(`http://${serverUrl}/member/me`)
      .then(({ data }) => {
        setMe(data);
      })
      .catch((e) => {
        console.log(e, 'get my profile error');
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

  const getRecords = () => {
    httpClient
      .get(`http://${serverUrl}/member/records`)
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const getDailyExpenses = () => {
    httpClient
      .get(`http://${serverUrl}/member/expenses/daily`)
      .then(({ data }) => {
        setDailyExpenses(data);
      })
      .catch((e) => {
        console.log(e, 'get dailyExpenses error');
      });
  };

  const getTemplates = () => {
    httpClient
      .get(`http://${serverUrl}/member/config/templates`)
      .then(({ data }) => {
        setTemplates(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
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
        Alert.config({ top: 80 });
        Alert.success('新しいレコードを追加しました');
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };

  const providerState = {
    me,
    members,
    records,
    dailyExpenses,
    templates,
    createRecord
  };

  return (
    <Cache.Provider value={providerState}>{children}</Cache.Provider>
  );
};

function withCache(Component) {
  const Consumer = props => {
    return (
      <Cache.Consumer>
        {state => {
          return <Component {...props} {...state} />;
        }}
      </Cache.Consumer>
    );
  };
  return Consumer;
}

export { Provider, withCache };
