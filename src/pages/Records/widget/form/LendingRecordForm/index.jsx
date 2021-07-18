import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateLendingRecord, useEditLendingRecord, useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { makeCategoryOption, makePlaceOption, makeMemberOption } from '../../../../../looksup';
import { defaultValue, model, makeFieldSchema } from './constants';
import Component from '../component';

const LendingRecordForm = () => {
	const { selected } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);

	const { fetchLendingRecords, fetchMyProfile, fetchMembers, fetchCategories, fetchPlaces } = useFetchData();
	const [{ data: lendingRecords }, { data: myProfile }, { data: members }, { data: categories }, { data: places }] =
		useQueries([
			{ queryKey: 'lendingRecords', queryFn: fetchLendingRecords },
			{ queryKey: 'myProfile', queryFn: fetchMyProfile },
			{ queryKey: 'members', queryFn: fetchMembers },
			{ queryKey: 'categories', queryFn: fetchCategories },
			{ queryKey: 'places', queryFn: fetchPlaces },
		]);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateLendingRecord({ me: myProfile?.id, categories, places, members });
	const { edit } = useEditLendingRecord({ categories, places, members });
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
					update('lendingRecords');
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
					update('lendingRecords');
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
			initialValue: !isCreate ? lendingRecords[selected] : defaultValue,
		}),
		[isCreate, selected, lendingRecords]
	);

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default LendingRecordForm;
