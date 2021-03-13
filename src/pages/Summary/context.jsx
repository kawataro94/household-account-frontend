import React, { useContext } from 'react';

import { LoginContext } from '../../context';
import { useResources } from '../../resources';

export const SummaryContext = React.createContext({});

export const Provider = ({ children }) => {
    const { isLogin } = useContext(LoginContext);
    const { resources } = useResources({ isLogin });
    const monthlyExpenses = resources?.monthlyExpenses?.read() || [];
    const expensesByMembers = resources?.expensesByMembers?.read() || [];
    const members = resources?.members?.read() || [];

    const value = { monthlyExpenses, expensesByMembers, members };

    return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
};
