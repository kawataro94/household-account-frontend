import React, { useState } from 'react';
import { Row, Col, Panel, Button, Alert } from 'rsuite';

import { useDeleteTemplate, useFetchTemplates, useCreateTemplate, useEditTemplate } from '../../../../hooks';
import { SectionTitle, Table } from '../../../../components';
import { makeCategoryOption, makePlaceOption } from '../../../../looksup';
import CreateEditModal from '../CreateEditModal';
import ConfirmModal from '../ConfirmModal';
import { categoryTag, confirmButton } from '../../style';

const Category = ({ category, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => category === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const Actions = ({ index, openConfirm, openCreateEditModal }) => (
	<>
		<Button appearance="primary" size="sm" onClick={() => openCreateEditModal(index)}>
			編集
		</Button>
		<Button color="red" size="sm" onClick={() => openConfirm(index)} css={confirmButton}>
			削除
		</Button>
	</>
);

const makeColumns = ({ categoryOption }) => [
	{
		header: 'テンプレート名',
		key: 'templateName',
	},
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
		name: 'templateName',
		label: 'Template Name',
		type: 'input',
	},
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

const TemplateTable = (props) => {
	const { templates, updateTemplates, categories, places } = props;
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
			fetch: useFetchTemplates,
			create: useCreateTemplate(categories, places).create,
			edit: useEditTemplate(categories, places).edit,
			update: (data) => updateTemplates(data),
		},
		data: templates?.map((template) => ({
			...template,
		})),
		initialValue: {
			templateName: '',
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
					Alert.success('レコードを削除しました');
					useFetchTemplates().then(({ data }) => updateTemplates(data));
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
			return <Actions {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return (
		<Row>
			<Col>
				<SectionTitle {...createButtonProps} />
			</Col>
			<Panel>
				<Table {...tableProps} />
			</Panel>
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</Row>
	);
};

export default TemplateTable;
