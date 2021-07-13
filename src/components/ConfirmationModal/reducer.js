export const initialState = {
	show: false,
	modalState: {},
};

const OPEN_CONFIRM_MODAL = 'OPEN_CONFIRM_MODAL';
const CLOSE_CONFIRM_MODAL = 'CLOSE_CONFIRM_MODAL';

const openConfirmModal = (index) => {
	return { type: OPEN_CONFIRM_MODAL, selected: index };
};

const closeConfirmModal = () => {
	return { type: CLOSE_CONFIRM_MODAL };
};

export const actions = {
	openConfirmModal,
	closeConfirmModal,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case OPEN_CONFIRM_MODAL:
			return {
				show: true,
				modalState: { selected: action.selected },
			};
		case CLOSE_CONFIRM_MODAL:
			return {
				show: false,
				modalState: {},
			};
		default:
			return state;
	}
};
