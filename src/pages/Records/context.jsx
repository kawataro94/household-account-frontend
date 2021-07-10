import React, { useEffect, useReducer } from 'react';

import { useResources } from '../../resources';
import { initalState, actions, reducer } from './reducer';

export const RecordsContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({
		keys: ['myProfile', 'members', 'records', 'lendingRecords', 'categories', 'places'],
	});
	const myProfile = resources?.myProfile?.read() || {};
	const members = resources?.members?.read() || [];
	const categories = resources?.categories?.read() || [];
	const places = resources?.places?.read() || [];
	const r = resources?.records?.read();
	const l = resources?.lendingRecords?.read();
	const [state, dispatch] = useReducer(reducer, initalState);
	const { records, lendingRecords } = state;

	useEffect(() => {
		dispatch(actions.updateRecords(r));
	}, [r]);

	useEffect(() => {
		dispatch(actions.updateLendingRecords(l));
	}, [l]);

	const value = {
		myProfile,
		members,
		categories,
		places,
		records,
		lendingRecords,
		dispatch,
	};

	return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};
