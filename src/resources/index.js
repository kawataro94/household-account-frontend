import { useState, useEffect } from 'react';

import {
	useFetchDailyExpenses,
	useFetchLendingRecords,
	useFetchMembers,
	useFetchMyProfile,
	useFetchRecords,
	useFetchTemplates,
} from '../hooks';
import { useCategories, usePlaces } from '../hooks/read';
import wrapPromise from './wrap-promise';

const apiHooks = {
	categories: () => useCategories(),
	dailyExpenses: () => useFetchDailyExpenses(),
	lendingRecords: () => useFetchLendingRecords(),
	members: () => useFetchMembers(),
	myProfile: () => useFetchMyProfile(),
	places: () => usePlaces(),
	records: () => useFetchRecords(),
	templates: () => useFetchTemplates(),
};

function createResource({ keys }) {
	const resources = keys?.reduce((acc, key) => {
		const fetch = apiHooks[key];
		return {
			...acc,
			[key]: wrapPromise(fetch()),
		};
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
