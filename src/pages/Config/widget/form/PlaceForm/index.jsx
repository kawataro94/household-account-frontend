import React, { useMemo, useContext, useCallback } from 'react';
import { useQueries } from 'react-query';

import { Alert } from '../../../../../components';
import { useCreatePlace } from '../../../../../hooks/create';
import { useUpdatePlace } from '../../../../../hooks/update';
import { useReactQuery, useFetchData } from '../../../../../hooks';
import { ModalStateContext } from '../../../../../components/Modal/context';
import { FormStateContext } from '../../../../../components/Form/context';
import { defaultValue, model, fieldSchema } from './constants';
import Component from '../component';

const PlaceForm = () => {
	const { selected } = useContext(ModalStateContext);
	const { formState } = useContext(FormStateContext);

	const { fetchPlaces } = useFetchData();
	const [{ data: places }] = useQueries([{ queryKey: 'places', queryFn: fetchPlaces }]);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const { create } = useCreatePlace();
	const { edit } = useUpdatePlace();
	const { update } = useReactQuery();

	const createPlace = useCallback((formValue) => {
		create(formValue)
			.then(() => {
				Alert.success('購入場所を追加しました');
				update('places');
			})
			.catch((e) => {
				console.log(e, 'post error');
			});
	}, []);

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
		[selected]
	);

	const onSubmit = useCallback(() => {
		if (isCreate) {
			createPlace(formState);
			return;
		}
		editPlace(formState, selected);
	}, [isCreate, formState, selected]);

	const createEditFormProps = useMemo(
		() => ({
			fieldSchema,
			model,
			initialValue: !isCreate ? places[selected] : defaultValue,
		}),
		[isCreate, selected, places]
	);
	console.log('formContainer');

	return <Component {...{ onSubmit, createEditFormProps }} />;
};

export default PlaceForm;
