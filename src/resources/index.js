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

function createResource() {
	return {
		expensesByMembers: wrapPromise(useFetchExpensesByMembers()),
		dailyExpenses: wrapPromise(useFetchDailyExpenses()),
		members: wrapPromise(useFetchMembers()),
		monthlyExpenses: wrapPromise(useFetchMonthlyExpenses()),
		myProfile: wrapPromise(useFetchMyProfile()),
		records: wrapPromise(useFetchRecords()),
		templates: wrapPromise(useFetchTemplates()),
	};
}

export const useResources = () => {
	const [resources, setResources] = useState({});

	useEffect(() => {
		setResources(createResource());
	}, []);

	return { resources };
};
