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
      .get('http://ec2-3-112-7-255.ap-northeast-1.compute.amazonaws.com/member/members')
      .then(({ data }) => {
        setMembers(data);
      })
      .catch((e) => {
        console.log(e, 'get members error');
      });
  };

  const getRecords = () => {
    axios
      .get('http://ec2-3-112-7-255.ap-northeast-1.compute.amazonaws.com/member/records')
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
      });
  };

  const getDailyExpenses = () => {
    axios
      .get('http://ec2-3-112-7-255.ap-northeast-1.compute.amazonaws.com/member/expenses/daily')
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
