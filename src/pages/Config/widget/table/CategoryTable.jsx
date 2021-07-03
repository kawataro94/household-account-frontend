import React, { useState } from 'react';
import { Row, Col, Panel, Button, Alert } from 'rsuite';

import { useDeleteCategory } from '../../../../hooks/delete';
import { useCategories } from '../../../../hooks/read';
import { useCreateCategory } from '../../../../hooks/create';
import { useUpdateCategory } from '../../../../hooks/update';
import { SectionTitle, Table } from '../../../../components';
import CreateEditModal from '../CreateEditModal';
import ConfirmModal from '../ConfirmModal';
import { confirmButton, categoryTag } from '../../style';

const Category = ({ color }) => {
	return (
		<div>
			<span css={categoryTag(color)}>{color}</span>
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

const fieldSchema = [
	{
		name: 'name',
		label: 'カテゴリ名',
		type: 'input',
	},
	{
		name: 'color',
		label: 'カラー',
		type: 'colorPicker',
	},
];

const TemplateTable = (props) => {
	const { categories, updateCategories } = props;
	const { remove: deleteCategory } = useDeleteCategory();

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
		fieldSchema,
		methods: {
			fetch: useCategories,
			create: useCreateCategory().create,
			edit: useUpdateCategory().edit,
			update: (data) => updateCategories(data),
		},
		data: categories,
		initialValue: { name: null, color: '#fddede' },
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deleteCategory(categories[index].id)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('レコードを削除しました');
					useCategories().then(({ data }) => updateCategories(data));
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
