export const initalState = {
	records: undefined,
	lendingRecords: undefined,
};

const UPDATE_RECORDS = 'UPDATE_RECORDS';
const UPDATE_LENDING_RECORDS = 'REFETCH_LENDING_RECORDS';

const updateRecords = (data) => {
	return { type: UPDATE_RECORDS, payload: data };
};

const updateLendingRecords = (data) => {
	return { type: UPDATE_LENDING_RECORDS, payload: data };
};

export const actions = {
	updateRecords,
	updateLendingRecords,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case UPDATE_RECORDS:
			return {
				...state,
				records: action.payload,
			};
		case UPDATE_LENDING_RECORDS:
			return {
				...state,
				lendingRecords: action.payload,
			};
		default:
			return state;
	}
};
