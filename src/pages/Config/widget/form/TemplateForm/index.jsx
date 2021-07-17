import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateTemplate, useEditTemplate, useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { makeCategoryOption, makePlaceOption } from '../../../../../looksup';
import { defaultValue, model, makeFieldSchema } from './constants';
import Component from '../component';

const TemplateForm = () => {
	const { selected } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);

	const { fetchCategories, fetchPlaces, fetchTemplates } = useFetchData();
	const [{ data: categories }, { data: places }, { data: templates }] = useQueries([
		{ queryKey: 'categories', queryFn: fetchCategories, suspense: true },
		{ queryKey: 'places', queryFn: fetchPlaces, suspense: true },
		{ queryKey: 'templates', queryFn: fetchTemplates, suspense: true },
	]);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateTemplate(categories, places);
	const { edit } = useEditTemplate(categories, places);
	const { update } = useReactQuery();

	const fieldSchema = useMemo(() => {
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		return makeFieldSchema({ categoryOption, placeOption, isCreate });
	}, [categories, places, isCreate]);

	const createTemplate = useCallback((formValue) => {
		create(formValue)
			.then(() => {
				Alert.success('テンプレートを追加しました');
				update('templates');
			})
			.catch((e) => {
				console.log(e, 'post error');
			});
	}, []);

	const editTemplate = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('テンプレートを編集しました');
					update('templates');
				})
				.catch((e) => {
					console.log(e, 'patch error');
				});
		},
		[selected]
	);

	const onSubmit = useCallback(() => {
		if (isCreate) {
			createTemplate(formState);
			return;
		}
		editTemplate(formState, selected);
	}, [isCreate, formState, selected]);

	const createEditFormProps = useMemo(
		() => ({
			fieldSchema,
			model,
			initialValue: !isCreate ? templates[selected] : defaultValue,
		}),
		[isCreate, selected, templates]
	);

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default TemplateForm;
