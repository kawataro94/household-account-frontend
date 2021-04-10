import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const DashboardContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({ keys: ['myProfile', 'members', 'dailyExpenses', 'templates', 'records'] });
	const myProfile = resources?.myProfile?.read() || {};
	const members = resources?.members?.read() || [];
	const dailyExpenses = resources?.dailyExpenses?.read() || [];
	const templates = resources?.templates?.read() || [];
	const r = resources?.records?.read();
	const [records, setRecords] = useState([]);

	useEffect(() => {
		setRecords(r);
	}, [r]);

	const updateRecords = (data) => {
		setRecords(data);
	};

	const value = {
		myProfile,
		members,
		dailyExpenses,
		templates,
		records,
		updateRecords,
	};

	return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
