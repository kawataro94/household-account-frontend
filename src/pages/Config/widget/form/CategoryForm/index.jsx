import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateCategory } from '../../../../../hooks/create';
import { useUpdateCategory } from '../../../../../hooks/update';
import { useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { defaultValue, model, fieldSchema } from './constants';
import Component from './component';

const CategoryForm = () => {
	const { selected } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);

	const { fetchCategories } = useFetchData();
	const [{ data: categories }] = useQueries([
		{ queryKey: 'categories', queryFn: fetchCategories, staleTime: 1000 * 10 },
	]);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateCategory();
	const { edit } = useUpdateCategory();
	const { update } = useReactQuery();

	const createCategory = useCallback((formValue) => {
		create(formValue)
			.then(() => {
				Alert.success('カテゴリを追加しました');
				update('categories');
			})
			.catch((e) => {
				console.log(e, 'post error');
			});
	}, []);

	const editCategory = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('カテゴリを編集しました');
					update('categories');
				})
				.catch((e) => {
					console.log(e, 'patch error');
				});
		},
		[selected]
	);

	const onSubmit = useCallback(() => {
		if (isCreate) {
			createCategory(formState);
			return;
		}
		editCategory(formState, selected);
	}, [isCreate, formState, selected]);

	const createEditFormProps = useMemo(
		() => ({
			fieldSchema,
			model,
			initialValue: !isCreate ? categories[selected] : defaultValue,
		}),
		[isCreate, selected, categories]
	);

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default CategoryForm;
