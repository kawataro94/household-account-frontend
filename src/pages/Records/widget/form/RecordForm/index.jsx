import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateRecord, useEditRecord, useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalStateContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { makeCategoryOption, makePlaceOption, makeMemberOption } from '../../../../../looksup';
import { defaultValue, model, makeFieldSchema } from './constants';
import Component from '../component';

const RecordForm = () => {
	const { selected } = useContext(ModalStateContext);
	const { formState } = useContext(FormStateContext);

	const { fetchRecords, fetchMyProfile, fetchMembers, fetchCategories, fetchPlaces } = useFetchData();
	const [{ data: records }, { data: myProfile }, { data: members }, { data: categories }, { data: places }] =
		useQueries([
			{ queryKey: 'records', queryFn: fetchRecords },
			{ queryKey: 'myProfile', queryFn: fetchMyProfile },
			{ queryKey: 'members', queryFn: fetchMembers },
			{ queryKey: 'categories', queryFn: fetchCategories },
			{ queryKey: 'places', queryFn: fetchPlaces },
		]);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateRecord({ me: myProfile?.id, categories, places, members });
	const { edit } = useEditRecord({ categories, places, members });
	const { update } = useReactQuery();

	const fieldSchema = useMemo(() => {
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		const memberOption = makeMemberOption(members);
		return makeFieldSchema({ categoryOption, placeOption, memberOption, isCreate });
	}, [categories, places, members, isCreate]);

	const createRecord = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('レコードを追加しました');
					update('records');
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		},
		[create]
	);

	const editRecord = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('レコードを編集しました');
					update('records');
				})
				.catch((e) => {
					console.log(e, 'patch error');
				});
		},
		[edit, selected]
	);

	const onSubmit = useCallback(() => {
		if (isCreate) {
			createRecord(formState);
			return;
		}
		editRecord(formState, selected);
	}, [isCreate, formState, selected]);

	const createEditFormProps = useMemo(
		() => ({
			fieldSchema,
			model,
			initialValue: !isCreate ? records[selected] : defaultValue,
		}),
		[isCreate, selected, records]
	);

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default RecordForm;
