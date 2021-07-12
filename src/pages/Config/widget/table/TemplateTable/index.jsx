import React, { useState } from 'react';
import { Alert } from 'rsuite';
import { useQueryClient } from 'react-query';

import { useDeleteTemplate, useCreateTemplate, useEditTemplate } from '../../../../../hooks';
import { ActionButtons } from '../../../../../components';
import { makeCategoryOption, makePlaceOption } from '../../../../../looksup';
import { categoryTag } from '../../../style';

import Component from './component';
import { useResources2 } from '../../../../../resources';

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

const makeFieldSchema = ({ categoryOption, placeOption }) => [
	{
		name: 'title',
		label: 'Title',
		type: 'input',
	},
	{
		name: 'category',
		label: 'Category',
		type: 'selectPicker',
		data: categoryOption,
		block: true,
	},
	{
		name: 'place',
		label: 'Place',
		type: 'selectPicker',
		data: placeOption,
		block: true,
	},
];

const TemplateTable = () => {
	const { templates, categories, places } = useResources2();
	const queryClient = useQueryClient();
	const update = () => queryClient.invalidateQueries('templates');

	const categoryOption = makeCategoryOption(categories);
	const placeOption = makePlaceOption(places);
	const { remove: deleteTemplate } = useDeleteTemplate();

	const [modalState, setModalState] = useState({
		show: false,
		selected: null,
	});
	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateEditModal = (index) => {
		setModalState({
			show: true,
			selected: index,
		});
	};

	const closeCreateEditModal = () => {
		setModalState({
			show: false,
			selected: null,
		});
	};

	const openConfirm = (index) => {
		setIsConfirm(true);
		setSelected(index);
	};

	const createButtonProps = {
		buttonText: '追加する',
		onClick: () => openCreateEditModal(),
	};

	const createEditModalProps = {
		modalState,
		closeCreateEditModal,
		fieldSchema: makeFieldSchema({ categoryOption, placeOption }),
		methods: {
			create: useCreateTemplate(categories, places).create,
			edit: useEditTemplate(categories, places).edit,
			update,
		},
		data: templates?.map((template) => ({
			...template,
		})),
		initialValue: {
			title: '',
			category: '',
			place: '',
		},
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deleteTemplate(templates[index].id)
				.then(() => {
					Alert.config({ top: 80 });
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

	return <Component {...{ createButtonProps, tableProps, createEditModalProps, confirmProps }} />;
};

export default TemplateTable;
