import React, { useCallback, useMemo, useContext } from 'react';
import { Alert, Schema } from 'rsuite';

import { Modal as FormModal, Form as Content } from '../../../components';
import { makeMemberOption, makeCategoryOption, makePlaceOption } from '../../../looksup';
import { useFetchRecords, useCreateRecord, useEditRecord } from '../../../hooks';
import { RecordsContext } from '../context';

import { ModalContext } from '../../../components/Modal/context';
import { FormStateContext } from '../../../components/Form/context';
import { actions as recordActions } from '../reducer';

Alert.config({ top: 80 });

const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
	title: StringType().isRequired('This field is required.'),
	category: StringType().isRequired('This field is required.'),
	place: StringType().isRequired('This field is required.'),
	date: DateType().isRequired('This field is required.'),
	paidBy: StringType().isRequired('This field is required.'),
	cost: NumberType().isRequired('This field is required.'),
});

const defaultValue = {
	title: '',
	category: '',
	place: '',
	date: undefined,
	paidBy: '',
	cost: undefined,
};

const makeFieldSchema = ({ categoryOption, placeOption, memberOption, isCreate }) => [
	{
		name: 'title',
		label: 'Title',
		type: 'input',
	},
	{
		name: 'category',
		label: `Category ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: categoryOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'date',
		label: `Date ${!isCreate ? '(readOnly)' : ''}`,
		type: 'date-picker',
		block: true,
		oneTap: true,
		readOnly: !isCreate,
	},
	{
		name: 'place',
		label: `Place ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: placeOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'paidBy',
		label: `Paid By ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: memberOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'cost',
		label: 'Cost',
		type: 'input',
	},
];

const RecordFormModal = () => {
	const { myProfile, members, categories, places, records, dispatch } = useContext(RecordsContext);
	const { selected } = useContext(ModalContext);
	const { formState } = useContext(FormStateContext);
	const fetchRecord = () => useFetchRecords();
	const { create } = useCreateRecord({ me: myProfile.id, categories, places, members });
	const { edit } = useEditRecord({ categories, places, members });

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const fieldSchema = useMemo(() => {
		const memberOption = makeMemberOption(members);
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		return makeFieldSchema({ categoryOption, placeOption, memberOption, isCreate });
	}, [members, categories, places, isCreate]);

	const createRecord = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('レコードを作成しました');
					fetchRecord().then(({ data }) => dispatch(recordActions.updateRecords(data)));
				})
				.catch((e) => {
					console.log(e, 'create error');
				});
		},
		[create]
	);

	const editRecord = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('レコードを編集しました');
					fetchRecord().then(({ data }) => dispatch(recordActions.updateRecords(data)));
				})
				.catch((e) => {
					console.log(e, 'edit error');
				});
		},
		[selected, edit]
	);

	const createEditFormProps = {
		fieldSchema,
		model,
		initialValue: !isCreate ? records[selected] : defaultValue,
	};

	const onSubmit = () => {
		if (isCreate) {
			createRecord(formState);
		}
		if (!isCreate) {
			editRecord(formState, selected);
		}
	};

	return (
		<FormModal onSubmit={onSubmit}>
			<Content {...createEditFormProps} />
		</FormModal>
	);
};

export default RecordFormModal;
