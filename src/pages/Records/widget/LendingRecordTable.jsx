import React, { useState } from 'react';
import { Row, Col, Alert } from 'rsuite';

import {
	useFetchLendingRecords,
	useCreateLendingRecord,
	useEditLendingRecord,
	useDeleteLendingRecord,
} from '../../../hooks';
import { Divider, SectionTitle, Table, ActionButtons } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';
import { categoryTag } from '../style';

const Category = ({ category, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => category === value) || {};
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

const makeColumns = ({ categoryOption }) => [
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
		cell: function getCategory({ category }) {
			return <Category {...{ category, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		key: 'place',
	},
	{
		header: 'コスト',
		cell: function getCost({ cost }) {
			return <Cost {...{ cost }} />;
		},
	},
	{
		header: '支払った人',
		key: 'paidBy',
	},
];

const initialValue = {
	title: '',
	category: '',
	place: '',
	date: null,
	paidBy: '',
	cost: 0,
};

const LendingRecordTable = (props) => {
	const { myProfile, members, categories, places, lendingRecords, updateLendingRecords } = props;
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = () => useFetchLendingRecords();
	const { create: createRecord } = useCreateLendingRecord({ me: myProfile?.id, members, categories, places });
	const { edit: editRecord } = useEditLendingRecord({ members, categories, places });
	const { remove: deleteRecord } = useDeleteLendingRecord();

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
		records: lendingRecords,
		fetchRecord,
		updateRecords: updateLendingRecords,
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
			deleteRecord(lendingRecords[selected].id)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('レコードを削除しました');
					fetchRecord().then(({ data }) => updateLendingRecords(data));
				})
				.catch((e) => {
					console.log(e, 'delete error');
				});
			setIsConfirm(false);
		},
		onCancel: () => setIsConfirm(false),
	};

	const tableProps = {
		data: lendingRecords,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ categoryOption }),
		actions: function actionButton(index) {
			return <ActionButtons {...{ index, openConfirm, openCreateEditModal }} />;
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

export default LendingRecordTable;
