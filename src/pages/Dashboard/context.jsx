import React, { useState } from 'react';

import { resources } from '../../resources';

export const DashboardContext = React.createContext({});

export const Provider = ({ children }) => {
  const myProfile = resources.myProfile.read();
  const members = resources.members.read();
  const dailyExpenses = resources.dailyExpenses.read();
  const templates = resources.templates.read();
  const [records, setRecords] = useState(resources.records.read());

  const value = { myProfile, members, dailyExpenses, templates, records, setRecords };

  return <DashboardContext.Provider value={value} >{children}</DashboardContext.Provider>;
};