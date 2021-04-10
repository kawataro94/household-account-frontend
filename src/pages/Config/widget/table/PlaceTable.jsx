import React, { useState } from 'react';
import { Row, Col, Panel, Button, Alert } from 'rsuite';

import { useDeletePlace } from '../../../../hooks/delete';
import { usePlaces } from '../../../../hooks/read';
import { useCreatePlace } from '../../../../hooks/create';
import { useUpdatePlace } from '../../../../hooks/update';
import { SectionTitle, Table } from '../../../../components';
import CreateEditModal from '../CreateEditModal';
import ConfirmModal from '../ConfirmModal';
import { confirmButton } from '../../style';

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
		header: '購入場所',
		key: 'name',
	}
];

const fieldSchema = [
	{
		name: 'name',
		label: '購入場所',
		type: 'input'
	}
];

const PlaceTable = (props) => {
	const { places, updatePlaces } = props
	const { remove: deletePlace } = useDeletePlace();

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
			fetch: usePlaces,
			create: useCreatePlace().create,
			edit: useUpdatePlace().edit,
			update: (data) => updatePlaces(data)
		},
		data: places,
		initialValue: { name: '' }
	};

	const confirmProps = {
		show: isConfirm,
		selected,
		onOk: (index) => {
			deletePlace(places[index].id)
				.then(() => {
					Alert.config({ top: 80 });
					Alert.success('レコードを削除しました');
					usePlaces().then(({ data }) => updatePlaces(data));
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
		data: places,
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

export default PlaceTable;