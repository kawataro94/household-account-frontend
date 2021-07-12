import React, { useState, useContext } from 'react';
import { useQueryClient } from 'react-query';

import { useDeleteTemplate } from '../../../../../hooks';
import { useResources2 } from '../../../../../resources';
import { ActionButtons, Alert } from '../../../../../components';
import { makeCategoryOption } from '../../../../../looksup';
import { actions as modalActions } from '../../../../../components/Modal/reducer';
import { ModalContext } from '../../../../../components/Modal/context';
import { categoryTag } from '../../../style';
import Component from './component';

const Category = ({ category, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => category === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const makeColumns = ({ categoryOption }) => [
	{
		header: 'タイトル',
		key: 'title',
	},
	{
		header: 'カテゴリ',
		cell: function getCategory({ category }) {
			return <Category {...{ category, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		key: 'place',
	},
];

const TemplateTable = ({ children }) => {
	const { templates, categories } = useResources2();
	const queryClient = useQueryClient();
	const update = () => queryClient.invalidateQueries('templates');

	const { dispatch: modalDispatch } = useContext(ModalContext);

	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateEditModal = (index) => {
		modalDispatch(modalActions.openEditModal(index));
	};

	const categoryOption = makeCategoryOption(categories);
	const { remove: deleteTemplate } = useDeleteTemplate();

	const openConfirm = (index) => {
		setIsConfirm(true);
		setSelected(index);
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deleteTemplate(templates[index].id)
				.then(() => {
					Alert.success('テンプレートを削除しました');
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
		data: templates,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ categoryOption }),
		actions: function actionButton(index) {
			return <ActionButtons {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return <Component {...{ tableProps, confirmProps, children }} />;
};

export default TemplateTable;
