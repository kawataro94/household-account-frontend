import React, { useState, useContext, useCallback } from 'react';
import { FlexboxGrid, Alert } from 'rsuite';

import {
	useFetchLendingRecords,
	useCreateLendingRecord,
	useEditLendingRecord,
	useDeleteLendingRecord,
} from '../../../hooks';
import { Button, Divider, Table, ActionButtons } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { RecordsContext } from '../context';
import { actions } from '../reducer';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';

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
	date: undefined,
	paidBy: '',
	cost: undefined,
};

const LendingRecordTable = (props) => {
	const { myProfile, members, categories, places, lendingRecords, dispatch, updateLendingRecords } =
		useContext(RecordsContext);
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = () => useFetchLendingRecords();
	const { create } = useCreateLendingRecord({ me: myProfile?.id, members, categories, places });
	const { edit } = useEditLendingRecord({ members, categories, places });
	const { remove } = useDeleteLendingRecord();

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

	const createRecord = useCallback(
		(formValue) => {
			create(formValue)
				.then(() => {
					Alert.success('レコードを作成しました');
					fetchRecord().then(({ data }) => dispatch(actions.updateLendingRecords(data)));
				})
				.catch((e) => {
					console.log(e, 'create error');
				});
			closeCreateEditModal();
		},
		[create]
	);

	const editRecord = useCallback(
		(formValue) => {
			edit(formValue, selected)
				.then(() => {
					Alert.success('レコードを編集しました');
					fetchRecord().then(({ data }) => dispatch(actions.updateLendingRecords(data)));
				})
				.catch((e) => {
					console.log(e, 'edit error');
				});
			closeCreateEditModal();
		},
		[selected, edit]
	);

	const deleteRecord = useCallback(() => {
		remove(lendingRecords[selected].id)
			.then(() => {
				Alert.success('レコードを削除しました');
				fetchRecord().then(({ data }) => dispatch(actions.updateLendingRecords(data)));
			})
			.catch((e) => {
				console.log(e, 'delete error');
			});
		setIsConfirm(false);
	}, [lendingRecords, selected]);

	const confirmProps = {
		show: isConfirm,
		selected: deleteRecord,
		onOk: remove,
		onCancel: () => setIsConfirm(false),
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
		<>
			<FlexboxGrid justify="end" align="middle">
				<Button onClick={openCreateEditModal}>追加する</Button>
			</FlexboxGrid>
			<Divider height="10" />
			<Table {...tableProps} />
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</>
	);
};

export default LendingRecordTable;
