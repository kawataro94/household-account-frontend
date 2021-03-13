import React, { useState, useContext } from 'react';
import { Row, Col, Panel, Button, Alert } from 'rsuite';

import { useDeleteTemplate, useFetchTemplates } from '../../../hooks';
import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import Table from '../../../components/Table';
import { categoryOption } from '../../../looksup';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';
import { categoryTag, confirmButton } from '../style';
import { ConfigContext } from '../context';

const Category = ({ category }) => {
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

const columns = [
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
			return <Category {...{ category }} />;
		},
	},
];

const TemplateTable = () => {
	const { templates, updateTemplates } = useContext(ConfigContext);
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
		columns,
		actions: function actionButton(index) {
			return <Actions {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return (
		<Row>
			<Col>
				<SectionTitle title="テンプレート一覧" {...createButtonProps} />
			</Col>
			<Divider height="10" />
			<Panel bordered>
				<Table {...tableProps} />
			</Panel>
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</Row>
	);
};

export default TemplateTable;
