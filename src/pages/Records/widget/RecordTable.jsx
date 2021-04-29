import React, { useState } from 'react';
import { Row, Col, Button, Alert } from 'rsuite';

import { useFetchRecords, useCreateRecord, useEditRecord, useDeleteRecord } from '../../../hooks';
import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import Table from '../../../components/Table';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';
import { categoryTag, buttonMargin } from '../style';

const Category = ({ categoryId, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => categoryId === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const Cost = ({ cost }) => (
	<span>
		{cost}
		<YenUnit />
	</span>
);

const MemberName = ({ members, memberId }) => {
	const member = (members || []).find(({ id }) => id === memberId);
	return <span>{member && member.account}</span>;
};

const Actions = ({ index, openConfirm, openCreateEditModal }) => (
	<>
		<Button appearance="primary" size="sm" onClick={() => openCreateEditModal(index)}>
			編集
		</Button>
		<Button color="red" size="sm" onClick={() => openConfirm(index)} css={buttonMargin}>
			削除
		</Button>
	</>
);

const makeColumns = ({ members, categoryOption }) => [
	{
		header: '日付',
		key: 'date',
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
		header: 'コスト',
		cell: function getCost({ cost }) {
			return <Cost {...{ cost }} />;
		},
	},
	{
		header: '支払った人',
		cell: function getMemberName({ memberId }) {
			return <MemberName {...{ members, memberId }} />;
		},
	},
];

const initialValue = {
	title: '',
	categoryId: null,
	date: null,
	paidBy: null,
	cost: '',
};

const RecordTable = (props) => {
	const { members, records, categories, updateRecords } = props;
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = () => useFetchRecords();
	const { create: createRecord } = useCreateRecord();
	const { edit: editRecord } = useEditRecord();
	const { remove: deleteRecord } = useDeleteRecord();

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

	const recordProps = {
		initialValue,
		records,
		fetchRecord,
		updateRecords,
		createRecord,
		editRecord,
	};

	const createEditModalProps = {
		modalState,
		closeCreateEditModal,
		recordProps,
		...props,
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: () => {
			deleteRecord(records[selected].id)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('レコードを削除しました');
					fetchRecord().then(({ data }) => updateRecords(data));
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
		data: records,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ members, categoryOption }),
		actions: function actionButton(index) {
			return <Actions {...{ index, openConfirm, openCreateEditModal }} />;
		},
	};

	return (
		<Row>
			<Col>
				<SectionTitle title="" {...createButtonProps} />
			</Col>
			<Divider height="10" />
			<Table {...tableProps} />
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</Row>
	);
};

export default RecordTable;
