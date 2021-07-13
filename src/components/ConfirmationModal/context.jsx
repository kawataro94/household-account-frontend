import React, { useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ConfirmContext = React.createContext({});

export const ConfirmProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { show, modalState } = state;

	const value = {
		show,
		modalState,
		dispatch,
	};

	return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
};
