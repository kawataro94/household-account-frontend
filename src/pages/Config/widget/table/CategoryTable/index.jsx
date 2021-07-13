import React, { useState, useContext } from 'react';

import { useDeleteCategory } from '../../../../../hooks/delete';
import { useQueryData, useReactQuery } from '../../../../../hooks';
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
	const { categories } = useQueryData(['categories']);
	const { update } = useReactQuery();

	const { dispatch: modalDispatch } = useContext(ModalContext);

	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateModal = () => {
		modalDispatch(modalActions.openCreateModal());
	};

	const openEditModal = (index) => {
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
					update('categories');
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
			return <ActionButtons {...{ index, openConfirm, openEditModal }} />;
		},
	};

	return <Component {...{ tableProps, confirmProps, openCreateModal, children }} />;
};

export default CategoryTable;
