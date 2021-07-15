export const initialState = {
	show: false,
	selected: null,
};

const OPEN_CREATE_MODAL = 'OPEN_CREATE_MODAL';
const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const openCreateModal = () => {
	return { type: OPEN_CREATE_MODAL };
};

const openEditModal = (index) => {
	return { type: OPEN_EDIT_MODAL, selected: index };
};

const closeModal = () => {
	return { type: CLOSE_MODAL };
};

export const actions = {
	openCreateModal,
	openEditModal,
	closeModal,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case OPEN_CREATE_MODAL:
			return {
				show: true,
				selected: null,
			};
		case OPEN_EDIT_MODAL:
			return {
				show: true,
				selected: action.selected,
			};
		case CLOSE_MODAL:
			return {
				show: false,
				selected: null,
			};
		default:
			return state;
	}
};
