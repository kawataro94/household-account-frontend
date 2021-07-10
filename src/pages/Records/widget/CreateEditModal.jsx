import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Button, Modal, Alert, Schema } from 'rsuite';

import { Form as CreateEditForm } from '../../../components';
import { makeMemberOption, makeCategoryOption, makePlaceOption } from '../../../looksup';
import { RecordsContext } from '../context';

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
	},
	{
		name: 'place',
		label: `Place ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: placeOption,
		block: true,
	},
	{
		name: 'paidBy',
		label: `Paid By ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: memberOption,
		block: true,
	},
	{
		name: 'cost',
		label: 'Cost',
		type: 'input',
	},
];

const { Header, Title, Body, Footer } = Modal;

const CreateEditModal = (props) => {
	const { modalState, closeCreateEditModal, recordProps } = props;
	const { initialValue, records, createRecord, editRecord } = recordProps;
	const { show, selected } = modalState;
	const { members, categories, places } = useContext(RecordsContext);
	const [formValue, setFormValue] = useState({});
	const [disabled, setDisabled] = useState(true);
	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);
	const fieldSchema = useMemo(() => {
		const memberOption = makeMemberOption(members);
		const categoryOption = makeCategoryOption(categories);
		const placeOption = makePlaceOption(places);
		return makeFieldSchema({ categoryOption, placeOption, memberOption, isCreate });
	}, [members, categories, places]);

	useEffect(() => {
		const fv = Number.isFinite(selected) ? records[selected] : initialValue;
		setFormValue(fv);
	}, [records, selected]);

	useEffect(() => {
		const inputValue = Object.values(formValue || {});
		setDisabled(
			inputValue.length < Object.keys(initialValue).length ||
				!Object.values(formValue || {}).every((v) => v !== undefined)
		);
	}, [formValue]);

	const onOk = () => {
		if (isCreate) {
			createRecord(formValue);
		}
		if (!isCreate) {
			editRecord(formValue, selected);
		}
		closeCreateEditModal();
	};
	const onCancel = () => {
		closeCreateEditModal();
	};

	const createEditFormProps = {
		formValue,
		setFormValue,
		isCreate,
		fieldSchema,
		model,
	};
	const okButtonProps = {
		onClick: () => onOk(),
		appearance: 'primary',
		disabled,
	};
	const cancelButtonProps = {
		onClick: () => onCancel(),
		appearance: 'subtle',
	};

	return (
		<Modal show={show} onHide={closeCreateEditModal} size="xs">
			<Header>
				<Title>Form</Title>
			</Header>
			<Body>
				<CreateEditForm {...createEditFormProps} />
			</Body>
			<Footer>
				<Button {...okButtonProps}>Ok</Button>
				<Button {...cancelButtonProps}>Cancel</Button>
			</Footer>
		</Modal>
	);
};

export default CreateEditModal;
