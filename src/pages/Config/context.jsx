import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const ConfigContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({ keys: ['templates']});
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
