import React, { useState } from 'react';
import { resources } from '../../resources';

export const RecordsContext = React.createContext({});

export const Provider = ({ children }) => {
  const [records, setRecords] = useState(resources.records.read());
  const [members, setMembers] = useState(resources.members.read());
  const value = { records, setRecords, members, setMembers };

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};