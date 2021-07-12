import React, { useMemo, useContext, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreateCategory } from '../../../../../hooks/create';
import { useUpdateCategory } from '../../../../../hooks/update';
import { useResources2 } from '../../../../../resources';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { defaultValue, model, fieldSchema } from './constants';
import Component from './component';

const CategoryForm = () => {
	const { modalState } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);
	const { selected } = modalState;

	const { categories } = useResources2();
	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateCategory();
	const { edit } = useUpdateCategory();
	const queryClient = useQueryClient();
	const update = () => queryClient.invalidateQueries('categories');

	const createCategory = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('カテゴリを追加しました');
					update();
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		},
		[create]
	);

	const editCategory = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('カテゴリを編集しました');
					update();
				})
				.catch((e) => {
					console.log(e, 'patch error');
				});
		},
		[selected, edit]
	);

	const onSubmit = () => {
		if (isCreate) {
			createCategory(formState);
			return;
		}
		editCategory(formState, selected);
	};

	const createEditFormProps = {
		fieldSchema,
		model,
		initialValue: !isCreate ? categories[selected] : defaultValue,
	};

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default CategoryForm;
