import React, { useState, useCallback, useContext } from 'react';
import { FlexboxGrid, Panel, Alert } from 'rsuite';

import { useFetchRecords, useCreateRecord, useEditRecord, useDeleteRecord } from '../../../hooks';
import { Divider, Button, Table, ActionButtons } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { actions } from '../reducer';
import { RecordsContext } from '../context';
import CreateEditModal from './CreateEditModal';
import ConfirmModal from './ConfirmModal';

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

const initialValue = {
	title: '',
	category: '',
	place: '',
	date: undefined,
	paidBy: '',
	cost: undefined,
};

const RecordTable = (props) => {
	const { myProfile, members, categories, places, records, dispatch } = useContext(RecordsContext);
	const categoryOption = makeCategoryOption(categories);
	const fetchRecord = useCallback(() => useFetchRecords(), []);

	const { create } = useCreateRecord({ me: myProfile.id, categories, places, members });
	const { edit } = useEditRecord({ categories, places, members });
	const { remove } = useDeleteRecord();

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
					fetchRecord().then(({ data }) => dispatch(actions.updateRecords(data)));
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
					fetchRecord().then(({ data }) => dispatch(actions.updateRecords(data)));
				})
				.catch((e) => {
					console.log(e, 'edit error');
				});
			closeCreateEditModal();
		},
		[selected, edit]
	);

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

	const recordProps = {
		initialValue,
		records,
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
			<FlexboxGrid justify="end" align="middle">
				<Button onClick={openCreateEditModal}>追加する</Button>
			</FlexboxGrid>
			<Divider height="10" />
			<Panel>
				<Table {...tableProps} />
			</Panel>
			<CreateEditModal {...createEditModalProps} />
			<ConfirmModal {...confirmProps} />
		</>
	);
};

export default RecordTable;
