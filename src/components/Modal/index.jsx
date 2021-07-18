import React, { useContext } from 'react';
import { Button, Modal } from 'rsuite';

import { actions } from './reducer';
import { ModalDispatchContext, ModalStateContext } from './context';

const { Header, Title, Body, Footer } = Modal;

const FormModal = (props) => {
	const { children, onSubmit: submitHundler } = props;
	const { show } = useContext(ModalStateContext);
	const { dispatch: modalDispatch } = useContext(ModalDispatchContext);

	const onSubmit = () => {
		submitHundler();
		modalDispatch(actions.closeModal());
	};

	const onCancel = () => {
		modalDispatch(actions.closeModal());
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
