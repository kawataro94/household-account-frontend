import React, { useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const SummaryContext = React.createContext({});

export const Provider = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { resources } = useResources({ isLogin });
  const monthlyExpenses = resources?.monthlyExpenses?.read() || [];

  const value = { monthlyExpenses };

  return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
};