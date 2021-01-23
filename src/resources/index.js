
import { useFetchDailyExpenses, useFetchMembers, useFetchMyProfile, useFetchRecords, useFetchTemplates } from '../hooks';
import wrapPromise from './wrap-promise';

export const resources = {
  dailyExpenses: wrapPromise(useFetchDailyExpenses()),
  members: wrapPromise(useFetchMembers()),
  myProfile: wrapPromise(useFetchMyProfile()),
  records: wrapPromise(useFetchRecords()),
  templates: wrapPromise(useFetchTemplates())
};