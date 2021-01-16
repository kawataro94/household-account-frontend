import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { serverUrl } from '../../../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

const Cache = React.createContext({});
const Provider = ({ children }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    getMonthlyExpenses();
  }, []);

  const getMonthlyExpenses = () => {
    httpClient
      .get(`http://${serverUrl}/member/expenses/monthly`)
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