import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const DashboardContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources();
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
