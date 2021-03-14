import React from 'react';

import { useResources } from '../../resources';

export const SummaryContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources();
	const monthlyExpenses = resources?.monthlyExpenses?.read() || [];
	const expensesByMembers = resources?.expensesByMembers?.read() || [];
	const members = resources?.members?.read() || [];

	const value = { monthlyExpenses, expensesByMembers, members };

	return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
};
