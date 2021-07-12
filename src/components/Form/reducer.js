const SET_FIELD_VALUES = 'SET_FIELD_VALUES';
const UPDATE_VALUE = 'UPDATE_VALUE';
const UPDATE_COLOR_VALUE = 'UPDATE_COLOR_VALUE';

const setFieldValues = (values) => {
	return { type: SET_FIELD_VALUES, values };
};

const updateValue = (key, value) => {
	return { type: UPDATE_VALUE, key, value };
};

const updateColorValue = (key, value) => {
	return { type: UPDATE_COLOR_VALUE, key, value };
};

export const actions = {
	setFieldValues,
	updateValue,
	updateColorValue,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_FIELD_VALUES:
			return {
				...action.values,
			};
		case UPDATE_VALUE:
			return {
				...state,
				[action.key]: action.value,
			};
		case UPDATE_COLOR_VALUE:
			return {
				...state,
				[action.key]: action.value.hex,
			};
		default:
			return state;
	}
};
