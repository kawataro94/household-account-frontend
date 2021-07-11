import React, { useState, useContext, useCallback } from 'react';
import { Alert } from 'rsuite';

import { useFetchLendingRecords, useDeleteLendingRecord } from '../../../hooks';
import { Table, ActionButtons } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { RecordsContext } from '../context';
import { actions } from '../reducer';
import ConfirmModal from './ConfirmModal';

import { actions as modalActions } from '../../../components/Modal/reducer';
import { ModalContext } from '../../../components/Modal/context';

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

const LendingRecordTable = (props) => {
	const { children } = props;
	const { dispatch: modalDispatch } = useContext(ModalContext);
	const { categories, lendingRecords, dispatch } = useContext(RecordsContext);
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = () => useFetchLendingRecords();
	const { remove } = useDeleteLendingRecord();

	const [isConfirm, setIsConfirm] = useState(false);
	const [selected, setSelected] = useState(null);

	const openCreateEditModal = (index) => {
		modalDispatch(modalActions.openEditModal(index));
	};

	const openConfirm = (index) => {
		setIsConfirm(true);
		setSelected(index);
	};

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
			{children}
			<Table {...tableProps} />
			<ConfirmModal {...confirmProps} />
		</>
	);
};

export default LendingRecordTable;
