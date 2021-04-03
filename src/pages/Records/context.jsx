import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const RecordsContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({ keys: ['members', 'records', 'lendingRecords']});
	const members = resources?.members?.read() || [];
	const r = resources?.records?.read();
	const l = resources?.lendingRecords?.read();
	const [records, setRecords] = useState([]);
	const [lendingRecords, setLendingRecords] = useState([]);

	useEffect(() => {
		setRecords(r);
	}, [r]);

	useEffect(() => {
		setLendingRecords(l);
	}, [l]);

	const updateRecords = (data) => {
		setRecords(data);
	};

	const updateLendingRecords = (data) => {
		setLendingRecords(data);
	};

	const value = { 
		members,
		records,
		lendingRecords,
		updateRecords,
		updateLendingRecords 
	};

	return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};
