import { useState, useEffect } from 'react';

import {
	useFetchExpensesByMembers,
	useFetchDailyExpenses,
	useFetchLendingByMembers,
	useFetchLendingRecords,
	useFetchMembers,
	useFetchMonthlyExpenses,
	useFetchMyProfile,
	useFetchRecords,
	useFetchTemplates,
	useTemplates as useTemplates2,
	useCategories as useCategories2,
	usePlaces as usePlaces2,
} from '../hooks';
import { useCategories, usePlaces } from '../hooks/read';
import wrapPromise from './wrap-promise';

const apiHooks = {
	categories: () => useCategories(),
	dailyExpenses: () => useFetchDailyExpenses(),
	expensesByMembers: () => useFetchExpensesByMembers(),
	lendingRecords: () => useFetchLendingRecords(),
	lendingByMembers: () => useFetchLendingByMembers(),
	members: () => useFetchMembers(),
	monthlyExpenses: () => useFetchMonthlyExpenses(),
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

export const useResources2 = () => {
	const {
		resource: { data: templates },
	} = useTemplates2();
	const {
		resource: { data: categories },
	} = useCategories2();
	const {
		resource: { data: places },
	} = usePlaces2();

	return {
		templates,
		categories,
		places,
	};
};
