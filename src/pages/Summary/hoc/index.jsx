import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cache = React.createContext({});
const Provider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [records, setRecords] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);

  useEffect(() => {
    getMembers();
    getRecords();
    getDailyExpenses();
  }, []);

  const getMembers = () => {
    axios
      .get('http://127.0.0.1:8000/member/members')
      .then(({ data }) => {
        setMembers(data);
      })
      .catch((e) => {
        console.log(e, 'get members error');
      });
  };

  const getRecords = () => {
    axios
      .get('http://127.0.0.1:8000/member/records')
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const getDailyExpenses = () => {
    axios
      .get('http://127.0.0.1:8000/member/expenses/daily')
      .then(({ data }) => {
        setDailyExpenses(data);
      })
      .catch((e) => {
        console.log(e, 'get dailyExpenses error');
      });
  };

  const summary = [
    {
      foodExpenses: 30000,
      livingExpenses: 20000,
      month: '2020/7',
      rentMonth: '7月分',
      rent: 10000,
      electricBill: 10000,
      waterBill: 10000,
      gasBill: 10000,
      total: 1000000
    },
    {
      foodExpenses: 50000,
      livingExpenses: 25000,
      month: '2020/8',
      rentMonth: '8月分',
      rent: 10000,
      electricBill: 10000,
      waterBill: 10000,
      gasBill: 10000,
      total: 2000000
    }
  ];

  const providerState = {
    members,
    records,
    dailyExpenses,
    summary
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