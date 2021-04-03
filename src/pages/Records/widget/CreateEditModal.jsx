import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Alert } from 'rsuite';

import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
	const { modalState, closeCreateEditModal, recordProps } = props;
	const { initialValue, records, fetchRecord, updateRecords, createRecord, editRecord } = recordProps;
	const { show, selected } = modalState;
	const [formValue, setFormValue] = useState();
	const [disabled, setDisabled] = useState(true);

	const isCreate = useMemo(() => !Number.isFinite(selected), [selected]);

	useEffect(() => {
		const fv = Number.isFinite(selected)
			? records[selected]
			: initialValue;
		setFormValue(fv);
	}, [records, selected]);

	useEffect(() => {
		const inputValue = Object.values(formValue || {});
		setDisabled(inputValue.length < Object.keys(initialValue).length || !Object.values(formValue || {}).every((v) => v !== undefined));
	}, [formValue]);

	const onOk = () => {
		if (isCreate) {
			createRecord(formValue)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('新しいレコードを追加しました');
					fetchRecord().then(({ data }) => updateRecords(data));
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		}
		if (!isCreate) {
			editRecord(formValue, selected)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('レコードを編集しました');
					fetchRecord().then(({ data }) => updateRecords(data));
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
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
