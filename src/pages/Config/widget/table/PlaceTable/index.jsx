import React, { useState, useContext } from 'react';
import { useQueryClient } from 'react-query';

import { useDeletePlace } from '../../../../../hooks/delete';
import { useResources2 } from '../../../../../resources';
import { ActionButtons, Alert } from '../../../../../components';
import { actions as modalActions } from '../../../../../components/Modal/reducer';
import { ModalContext } from '../../../../../components/Modal/context';
import Component from './component';

const columns = [
	{
		header: '購入場所',
		key: 'name',
	},
];

const PlaceTable = ({ children }) => {
	const { places } = useResources2();
	const queryClient = useQueryClient();
	const update = () => queryClient.invalidateQueries('places');

	const { dispatch: modalDispatch } = useContext(ModalContext);

	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateEditModal = (index) => {
		modalDispatch(modalActions.openEditModal(index));
	};

	const { remove: deletePlace } = useDeletePlace();

	const openConfirm = (index) => {
		setIsConfirm(true);
		setSelected(index);
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deletePlace(places[index].id)
				.then(() => {
					Alert.success('購入場所を削除しました');
					update();
				})
				.catch((e) => {
					console.log(e, 'delete error');
				});
			setIsConfirm(false);
		},
		onCancel: () => setIsConfirm(false),
	};

	const tableProps = {
		data: places,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns,
		actions: function actionButton(index) {
			return <ActionButtons {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return <Component {...{ tableProps, confirmProps, children }} />;
};

export default PlaceTable;
