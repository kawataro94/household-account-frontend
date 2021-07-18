import React, { useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ModalStateContext = React.createContext({});
export const ModalDispatchContext = React.createContext({});

export const ModalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ModalStateContext.Provider value={{ ...state }}>
			<ModalDispatchContext.Provider value={{ dispatch }}>{children}</ModalDispatchContext.Provider>
		</ModalStateContext.Provider>
	);
};
