import React, { useState } from 'react';
import { Row, Col, Panel, Button, Alert } from 'rsuite';

import { useDeleteTemplate, useFetchTemplates, useCreateTemplate, useEditTemplate } from '../../../../hooks';
import { SectionTitle, Table } from '../../../../components';
import { makeCategoryOption, makePlaceOption } from '../../../../looksup';
import CreateEditModal from '../CreateEditModal';
import ConfirmModal from '../ConfirmModal';
import { categoryTag, confirmButton } from '../../style';

const Category = ({ categoryId, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => Number(categoryId) === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const Place = ({ placeId, placeOption }) => {
	const { label } = placeOption.find(({ value }) => Number(placeId) === value) || {};
	return (
		<div>
			<span>{label}</span>
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

const makeColumns = ({ categoryOption, placeOption }) => [
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
		cell: function getCategory({ categoryId }) {
			return <Category {...{ categoryId, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		cell: function getPlace({ placeId }) {
			return <Place {...{ placeId, placeOption }} />;
		},
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
		name: 'categoryId',
		label: 'Category',
		type: 'selectPicker',
		data: categoryOption,
		block: true,
	},
	{
		name: 'placeId',
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
			create: useCreateTemplate().create,
			edit: useEditTemplate().edit,
			update: (data) => updateTemplates(data),
		},
		data: templates?.map((template) => ({
			...template,
			categoryId: Number(template.categoryId),
			placeId: Number(template.placeId),
		})),
		initialValue: {
			templateName: '',
			title: '',
			categoryId: null,
			placeId: null,
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
		height: 520,
		data: templates,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ categoryOption, placeOption }),
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
