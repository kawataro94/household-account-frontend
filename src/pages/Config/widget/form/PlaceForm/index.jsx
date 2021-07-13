import React, { useMemo, useContext, useCallback } from 'react';

import { Alert } from '../../../../../components';
import { useCreatePlace } from '../../../../../hooks/create';
import { useUpdatePlace } from '../../../../../hooks/update';
import { useReactQuery, useQueryData } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { defaultValue, model, fieldSchema } from './constants';
import Component from './component';

const PlaceForm = () => {
	const { modalState } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);
	const { selected } = modalState;

	const { places } = useQueryData(['places']);
	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreatePlace();
	const { edit } = useUpdatePlace();
	const { update } = useReactQuery();

	const createPlace = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('購入場所を追加しました');
					update('places');
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		},
		[create]
	);

	const editPlace = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('購入場所を編集しました');
					update('places');
				})
				.catch((e) => {
					console.log(e, 'patch error');
				});
		},
		[selected, edit]
	);

	const onSubmit = () => {
		if (isCreate) {
			createPlace(formState);
			return;
		}
		editPlace(formState, selected);
	};

	const createEditFormProps = {
		fieldSchema,
		model,
		initialValue: !isCreate ? places[selected] : defaultValue,
	};

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default PlaceForm;
