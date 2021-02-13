import React, { useState, useEffect, useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const ConfigContext = React.createContext({});

export const Provider = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { resources } = useResources({ isLogin });
  const t = resources?.templates?.read();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    setTemplates(t);
  }, [t]);

  const updateTemplates = (data) => {
    setTemplates(data);
  };

  const value = { templates, updateTemplates };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};