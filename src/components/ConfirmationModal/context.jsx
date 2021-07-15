import React, { useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ConfirmContext = React.createContext({});

export const ConfirmProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { show, selected } = state;

	const value = {
		show,
		selected,
		dispatch,
	};

	return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
};
