import React, { useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ModalContext = React.createContext({});

export const ModalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { show, modalState } = state;

	const value = {
		show,
		modalState,
		dispatch,
	};

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
