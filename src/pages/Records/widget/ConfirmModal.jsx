import React from 'react';
import { Button, Modal, Icon } from 'rsuite';

import { modalBody, modalIcon, textIndent } from '../style';

const { Body, Footer } = Modal;
const ConfirmModal = (props) => {
	const { show, onOk, onCancel, selected } = props;

	const modalProps = {
		show,
		size: 'xs',
		closeButton: false,
	};

	return (
		<Modal {...modalProps}>
			<Body css={modalBody}>
				<p>
					<Icon icon="remind" size="lg" css={modalIcon} />
					<span>この操作は取り消すことができません。</span>
				</p>
				<p css={textIndent}>本当に削除しますか？</p>
			</Body>
			<Footer>
				<Button appearance="primary" onClick={() => onOk(selected)}>
					Ok
				</Button>
				<Button onClick={() => onCancel()}>Cancel</Button>
			</Footer>
		</Modal>
	);
};

export default ConfirmModal;
