import React, { useState, useCallback, useContext } from 'react';
import { Alert } from 'rsuite';

import { useFetchRecords, useDeleteRecord } from '../../../hooks';
import { Table, ActionButtons } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { actions } from '../reducer';
import { RecordsContext } from '../context';
import ConfirmModal from './ConfirmModal';

import { actions as modalActions } from '../../../components/Modal/reducer';
import { ModalContext } from '../../../components/Modal/context';

Alert.config({ top: 80 });

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

const RecordTable = (props) => {
	const { children } = props;
	const { dispatch: modalDispatch } = useContext(ModalContext);
	const { categories, records, dispatch } = useContext(RecordsContext);
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = useCallback(() => useFetchRecords(), []);

	const { remove } = useDeleteRecord();

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
		remove(records[selected].id)
			.then(() => {
				Alert.success('レコードを削除しました');
				fetchRecord().then(({ data }) => dispatch(actions.updateRecords(data)));
			})
			.catch((e) => {
				console.log(e, 'delete error');
			});
		setIsConfirm(false);
	}, [records, selected]);

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: deleteRecord,
		onCancel: () => setIsConfirm(false),
	};

	const tableProps = {
		data: records,
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

export default RecordTable;
