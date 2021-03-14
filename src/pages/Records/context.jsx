import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const RecordsContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources();
	const members = resources?.members?.read() || [];
	const r = resources?.records?.read();
	const [records, setRecords] = useState([]);

	useEffect(() => {
		setRecords(r);
	}, [r]);

	const updateRecords = (data) => {
		setRecords(data);
	};

	const value = { members, records, updateRecords };

	return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};
