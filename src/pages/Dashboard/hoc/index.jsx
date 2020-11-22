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
      .get('54.95.237.19/member/members')
      .then(({ data }) => {
        setMembers(data);
      })
      .catch((e) => {
        console.log(e, 'get members error');
      });
  };

  const getRecords = () => {
    axios
      .get('54.95.237.19/member/records')
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const getDailyExpenses = () => {
    axios
      .get('54.95.237.19/member/expenses/daily')
      .then(({ data }) => {
        setDailyExpenses(data);
      })
      .catch((e) => {
        console.log(e, 'get dailyExpenses error');
      });
  };

  const providerState = {
    members,
    records,
    dailyExpenses
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
