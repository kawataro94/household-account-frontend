import React, { useContext } from 'react';

import { ActionButtons } from '../../../../components';
import { actions as modalActions } from '../../../../components/Modal/reducer';
import { actions as confirmActions } from '../../../../components/ConfirmationModal/reducer';
import { ModalDispatchContext } from '../../../../components/Modal/context';
import { ConfirmContext } from '../../../../components/ConfirmationModal/context';
import Component from './component';

const Container = ({ data, columns }) => {
	const { dispatch: modalDispatch } = useContext(ModalDispatchContext);
	const { dispatch: confirmDispatch } = useContext(ConfirmContext);

	const openCreateForm = () => {
		modalDispatch(modalActions.openCreateForm());
	};

	const openEditForm = (index) => {
		modalDispatch(modalActions.openEditForm(index));
	};

	const openConfirm = (index) => {
		confirmDispatch(confirmActions.openConfirmModal(data[index].id));
	};

	const tableProps = {
		data,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns,
		actions: function actionButton(index) {
			return <ActionButtons {...{ index, openConfirm, openEditForm }} />;
		},
	};

	return <Component {...{ tableProps, openCreateForm }} />;
};

export default Container;
