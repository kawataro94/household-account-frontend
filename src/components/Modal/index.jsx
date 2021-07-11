import React, { useContext } from 'react';
import { Button, Modal } from 'rsuite';

import { actions } from './reducer';
import { ModalContext } from './context';

const { Header, Title, Body, Footer } = Modal;

const FormModal = (props) => {
	const { children, onSubmit: submitHundler } = props;
	const { show, dispatch } = useContext(ModalContext);

	const onSubmit = () => {
		submitHundler();
		dispatch(actions.closeModal());
	};

	const onCancel = () => {
		dispatch(actions.closeModal());
	};

	const okProps = {
		onClick: onSubmit,
		appearance: 'primary',
		// disabled,
	};
	const cancelProps = {
		onClick: onCancel,
		appearance: 'subtle',
	};

	return (
		<Modal show={show} onHide={onCancel} size="xs">
			<Header>
				<Title>Form</Title>
			</Header>
			<Body>{children}</Body>
			<Footer>
				<Button {...okProps}>Ok</Button>
				<Button {...cancelProps}>Cancel</Button>
			</Footer>
		</Modal>
	);
};

export default FormModal;
