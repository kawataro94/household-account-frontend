import React, { useReducer } from 'react';

import { reducer } from './reducer';

export const FormStateContext = React.createContext({});
export const FormDispatchContext = React.createContext({});

export const FormProvider = ({ children }) => {
	const [formState, formDispatch] = useReducer(reducer);

	return (
		<FormStateContext.Provider value={{ formState }}>
			<FormDispatchContext.Provider value={{ formDispatch }}>{children}</FormDispatchContext.Provider>
		</FormStateContext.Provider>
	);
};
