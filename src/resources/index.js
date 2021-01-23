
import { useFetchMembers, useFetchMyProfile, useFetchRecords, useFetchTemplates } from '../hooks';
import wrapPromise from './wrap-promise';

export const resources = {
  members: wrapPromise(useFetchMembers()),
  myProfile: wrapPromise(useFetchMyProfile()),
  templates: wrapPromise(useFetchTemplates()),
  records: wrapPromise(useFetchRecords())
};