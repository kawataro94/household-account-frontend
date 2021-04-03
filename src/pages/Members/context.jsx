import React from 'react';

import { useResources } from '../../resources';

export const MembersContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({ keys: ['members'] });
	const members = resources?.members?.read() || [];

	const value = { members };

	return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>;
};
