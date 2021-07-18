export const initialState = {
	show: false,
	selected: null,
};

const OPEN_CREATE_FORM = 'OPEN_CREATE_FORM';
const OPEN_EDIT_FORM = 'OPEN_EDIT_FORM';
const OPEN_QUICK_FORM = 'OPEN_QUICK_FORM';
const CLOSE_MODAL = 'CLOSE_MODAL';

const openCreateForm = () => {
	return { type: OPEN_CREATE_FORM };
};

const openEditForm = (index) => {
	return { type: OPEN_EDIT_FORM, selected: index };
};

const openQuickForm = (index) => {
	return { type: OPEN_QUICK_FORM, selected: index };
};

const closeModal = () => {
	return { type: CLOSE_MODAL };
};

export const actions = {
	openCreateForm,
	openEditForm,
	openQuickForm,
	closeModal,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case OPEN_CREATE_FORM:
			return {
				show: true,
				selected: null,
			};
		case OPEN_EDIT_FORM:
			return {
				show: true,
				selected: action.selected,
			};
		case OPEN_QUICK_FORM:
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
