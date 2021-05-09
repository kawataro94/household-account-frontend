import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const DashboardContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({
		keys: ['myProfile', 'members', 'monthlyExpenses', 'templates', 'records', 'categories', 'places'],
	});
	const myProfile = resources?.myProfile?.read() || {};
	const members = resources?.members?.read() || [];
	const categories = resources?.categories?.read() || [];
	const places = resources?.places?.read() || [];
	const monthlyExpenses = resources?.monthlyExpenses?.read() || [];
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
		categories,
		places,
		monthlyExpenses,
		templates,
		records,
		updateRecords,
	};

	return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
