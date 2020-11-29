import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cache = React.createContext({});
const Provider = ({ children }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    getMonthlyExpenses();
  }, []);

  const getMonthlyExpenses = () => {
    axios
      .get('http://localhost:8000/member/expenses/monthly')
      .then(({ data }) => {
        setMonthlyExpenses(data);
      })
      .catch((e) => {
        console.log(e, 'get dailyExpenses error');
      });
  };

  const providerState = {
    summary: monthlyExpenses
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