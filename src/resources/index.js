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

export const useResources = ({ isLogin }) => {
    const [resources, setResources] = useState({});

    useEffect(() => {
        if (!isLogin) {
            setResources({});
            return;
        }
        setResources(createResource());
    }, [isLogin]);

    return { resources };
};
