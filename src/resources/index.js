import { useState, useEffect } from 'react';

import {
	useFetchExpensesByMembers,
	useFetchDailyExpenses,
	useFetchMembers,
	useFetchMonthlyExpenses,
	useFetchMyProfile,
	useFetchRecords,
	useFetchTemplates,
} from '../hooks';
import wrapPromise from './wrap-promise';

const apiHooks = {
		expensesByMembers: () => useFetchExpensesByMembers(),
		dailyExpenses: () => useFetchDailyExpenses(),
		members: () => useFetchMembers(),
		monthlyExpenses: () => useFetchMonthlyExpenses(),
		myProfile: () => useFetchMyProfile(),
		records: () => useFetchRecords(),
		templates: () => useFetchTemplates(),
}

function createResource({ keys }) {
	const resources = keys?.reduce((acc, key) => {
		const fetch = apiHooks[key];
		return {
			...acc,
			[key]: wrapPromise(fetch()),
		}
	}, {}); 

	return resources;
}

export const useResources = ({ keys }) => {
	const [resources, setResources] = useState({});

	useEffect(() => {
		setResources(createResource({ keys }));
	}, []);

	return { resources };
};
