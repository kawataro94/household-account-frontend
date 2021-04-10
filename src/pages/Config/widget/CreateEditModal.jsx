import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'rsuite';

import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
	const { modalState, closeCreateEditModal, fieldSchema, methods, data, initialValue } = props;
	const { fetch, create, edit, update } = methods;

	const { show, selected } = modalState;
	const [formValue, setFormValue] = useState();
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const fv = Number.isFinite(selected) ? data[selected] : initialValue;
		setFormValue(fv);
	}, [data, selected]);

	useEffect(() => {
		const inputValue = Object.values(formValue || {});
		setDisabled(
			inputValue.length < Object.keys(initialValue).length ||
				!Object.values(formValue || {}).every((v) => v !== undefined)
		);
	}, [formValue]);

	const onOk = () => {
		const createNew = !Number.isFinite(selected);
		if (createNew) {
			create(formValue)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('新しいテンプレートを追加しました');
					fetch().then(({ data }) => update(data));
				})
				.catch((e) => {
					console.log(e, 'post error');
				});
		}
		if (!createNew) {
			edit(formValue, selected)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('テンプレートを編集しました');
					fetch().then(({ data }) => update(data));
				})
				.catch((e) => {
					console.log(e, 'patch error');
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
		fieldSchema,
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
