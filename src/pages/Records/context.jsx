import React, { useState, useEffect, useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const RecordsContext = React.createContext({});

export const Provider = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { resources } = useResources({ isLogin });
  const members = resources?.members?.read() || [];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(resources?.records?.read() || []);
  }, [resources]);

  const updateRecords = (data) => {
    setRecords(data);
  };

  const value = { members, records, updateRecords };

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};