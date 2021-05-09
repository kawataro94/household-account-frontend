import React from 'react';

import { useResources } from '../../resources';

export const SummaryContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({
		keys: ['members', 'categories', 'monthlyExpenses', 'expensesByMembers', 'lendingByMembers'],
	});
	const members = resources?.members?.read() || [];
	const categories = resources?.categories?.read() || [];
	const monthlyExpenses = resources?.monthlyExpenses?.read() || [];
	const expensesByMembers = resources?.expensesByMembers?.read() || [];
	const lendingByMembers = resources?.lendingByMembers?.read() || [];

	const value = { members, categories, monthlyExpenses, expensesByMembers, lendingByMembers };

	return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
};
