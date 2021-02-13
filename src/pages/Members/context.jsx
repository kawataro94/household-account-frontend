import React, { useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const MembersContext = React.createContext({});

export const Provider = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { resources } = useResources({ isLogin });
  const members = resources?.members?.read() || [];

  const value = { members };

  return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>;
};