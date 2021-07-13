import React, { useMemo, useContext, useCallback } from 'react';

import { Alert } from '../../../../../components';
import { useCreateTemplate, useEditTemplate, useQueryData, useReactQuery } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { makeCategoryOption, makePlaceOption } from '../../../../../looksup';
import { defaultValue, model, makeFieldSchema } from './constants';
import Component from './component';

const TemplateForm = () => {
	const { modalState } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);
	const { selected } = modalState;

	const { templates, categories, places } = useQueryData(['templates', 'categories', 'places']);
	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreateTemplate(categories, places);
	const { edit } = useEditTemplate(categories, places);
	const { update } = useReactQuery();

	const fieldSchema = useMemo(() => {
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		return makeFieldSchema({ categoryOption, placeOption, isCreate });
	}, [categories, places, isCreate]);

	const createTemplate = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('テンプレートを追加しました');
					update('templates');
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		},
		[create]
	);

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
		[selected, edit]
	);

	const onSubmit = () => {
		if (isCreate) {
			createTemplate(formState);
			return;
		}
		editTemplate(formState, selected);
	};

	const createEditFormProps = {
		fieldSchema,
		model,
		initialValue: !isCreate ? templates[selected] : defaultValue,
	};

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default TemplateForm;
