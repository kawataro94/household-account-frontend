import React, { useContext } from 'react';

import { ActionButtons } from '../../../../components';
import { actions as modalActions } from '../../../../components/Modal/reducer';
import { actions as confirmActions } from '../../../../components/ConfirmationModal/reducer';
import { ModalContext } from '../../../../components/Modal/context';
import { ConfirmContext } from '../../../../components/ConfirmationModal/context';
import Component from './component';

const TemplateTable = ({ data, columns }) => {
	const { dispatch: modalDispatch } = useContext(ModalContext);
	const { dispatch: confirmDispatch } = useContext(ConfirmContext);

	const openCreateModal = () => {
		modalDispatch(modalActions.openCreateModal());
	};

	const openEditModal = (index) => {
		modalDispatch(modalActions.openEditModal(index));
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
			return <ActionButtons {...{ index, openConfirm, openEditModal }} />;
		},
	};

	return <Component {...{ tableProps, openCreateModal }} />;
};

export default TemplateTable;
