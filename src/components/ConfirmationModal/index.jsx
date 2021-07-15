import React, { useContext } from 'react';
import { Button, Modal, Icon } from 'rsuite';

import { useReactQuery } from '../../hooks';
import { useDeleteAPI } from '../../hooks/delete';
import { Alert } from '../index';
import { modalBody, modalIcon, textIndent } from './style';
import { actions } from './reducer';
import { ConfirmContext } from './context';

const { Body, Footer } = Modal;
const ConfirmModal = ({ active: key }) => {
	const { show, selected, dispatch } = useContext(ConfirmContext);

	const { remove } = useDeleteAPI(key);
	const { update } = useReactQuery();

	const onOk = () => {
		remove(selected)
			.then(() => {
				Alert.success('削除しました');
				update(key);
			})
			.catch((e) => {
				console.log(e, 'delete error');
			});
		dispatch(actions.closeConfirmModal());
	};

	const onCancel = () => {
		dispatch(actions.closeConfirmModal());
	};

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
				<Button appearance="primary" onClick={() => onOk()}>
					Ok
				</Button>
				<Button onClick={() => onCancel()}>Cancel</Button>
			</Footer>
		</Modal>
	);
};

export default ConfirmModal;
