import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateRecord, useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalStateContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { makeCategoryOption, makePlaceOption, makeMemberOption } from '../../../../../looksup';
import { model, makeFieldSchema } from './constants';
import Component from '../component';

const RecordForm = () => {
	const { selected } = useContext(ModalStateContext);
	const { formState } = useContext(FormStateContext);

	const { fetchTemplates, fetchMyProfile, fetchMembers, fetchCategories, fetchPlaces } = useFetchData();
	const [{ data: templates = [] }, { data: myProfile }, { data: members }, { data: categories }, { data: places }] =
		useQueries([
			{ queryKey: 'templates', queryFn: fetchTemplates },
			{ queryKey: 'myProfile', queryFn: fetchMyProfile },
			{ queryKey: 'members', queryFn: fetchMembers },
			{ queryKey: 'categories', queryFn: fetchCategories },
			{ queryKey: 'places', queryFn: fetchPlaces },
		]);

	const { create } = useCreateRecord({ me: myProfile?.id, categories, places, members });
	const { update } = useReactQuery();

	const fieldSchema = useMemo(() => {
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		const memberOption = makeMemberOption(members);
		return makeFieldSchema({ categoryOption, placeOption, memberOption });
	}, [categories, places, members]);

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

	const onSubmit = useCallback(() => {
		createRecord(formState);
	}, [formState]);

	const initialValue = useMemo(
		() => ({
			...templates.find((template) => template.id === selected),
			date: new Date(),
			paidBy: myProfile?.account,
		}),
		[selected, templates, myProfile]
	);

	const createEditFormProps = useMemo(
		() => ({
			fieldSchema,
			model,
			initialValue,
		}),
		[fieldSchema, initialValue]
	);

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default RecordForm;
