import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Alert } from 'rsuite';

const Cache = React.createContext({});
const Provider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [records, setRecords] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getMembers();
    getRecords();
    getDailyExpenses();
    getTemplates();
  }, []);

  const getMembers = () => {
    axios
      .get('http://localhost:8000/member/members')
      .then(({ data }) => {
        setMembers(data);
      })
      .catch((e) => {
        console.log(e, 'get members error');
      });
  };

  const getRecords = () => {
    axios
      .get('http://localhost:8000/member/records')
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const getDailyExpenses = () => {
    axios
      .get('http://localhost:8000/member/expenses/daily')
      .then(({ data }) => {
        setDailyExpenses(data);
      })
      .catch((e) => {
        console.log(e, 'get dailyExpenses error');
      });
  };

  const getTemplates = () => {
    axios
      .get('http://localhost:8000/member/config/templates')
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

    axios
      .post(`http://localhost:8000/member/records`, params)
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
