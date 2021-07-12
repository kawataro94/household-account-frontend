import React, { useState, useContext } from 'react';
import { useQueryClient } from 'react-query';

import { useDeleteCategory } from '../../../../../hooks/delete';
import { useResources2 } from '../../../../../resources';
import { ActionButtons, Alert } from '../../../../../components';
import { actions as modalActions } from '../../../../../components/Modal/reducer';
import { ModalContext } from '../../../../../components/Modal/context';
import { categoryTag } from '../../../style';
import Component from './component';

const Category = ({ color }) => {
	return (
		<div>
			<span css={categoryTag(color)}>{color}</span>
		</div>
	);
};

const columns = [
	{
		header: 'カテゴリ名',
		key: 'name',
	},
	{
		header: 'カラー',
		cell: function getCategory({ color }) {
			return <Category {...{ color }} />;
		},
	},
];

const CategoryTable = ({ children }) => {
	const { categories } = useResources2();
	const queryClient = useQueryClient();
	const update = () => queryClient.invalidateQueries('categories');

	const { dispatch: modalDispatch } = useContext(ModalContext);

	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateEditModal = (index) => {
		modalDispatch(modalActions.openEditModal(index));
	};

	const { remove: deleteCategory } = useDeleteCategory();

	const openConfirm = (index) => {
		setIsConfirm(true);
		setSelected(index);
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deleteCategory(categories[index].id)
				.then(() => {
					Alert.success('カテゴリを削除しました');
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
		data: categories,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns,
		actions: function actionButton(index) {
			return <ActionButtons {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return <Component {...{ tableProps, confirmProps, children }} />;
};

export default CategoryTable;
