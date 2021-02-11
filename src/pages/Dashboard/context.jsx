import React, { useState, useEffect, useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const DashboardContext = React.createContext({});

export const Provider = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { resources } = useResources({ isLogin });
  const myProfile = resources?.myProfile?.read() || {};
  const members = resources?.members?.read() || [];
  const dailyExpenses = resources?.dailyExpenses?.read() || [];
  const templates = resources?.templates?.read() || [];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(resources?.records?.read() || []);
  }, [resources]);

  const updateRecords = (data) => {
    setRecords(data);
  };

  const value = { myProfile, members, dailyExpenses, templates, records, updateRecords };

  return <DashboardContext.Provider value={value} >{children}</DashboardContext.Provider>;
};