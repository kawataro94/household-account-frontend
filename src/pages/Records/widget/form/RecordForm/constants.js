import { Schema } from 'rsuite';

const { StringType, NumberType, DateType } = Schema.Types;
export const model = Schema.Model({
	title: StringType().isRequired('This field is required.'),
	category: StringType().isRequired('This field is required.'),
	place: StringType().isRequired('This field is required.'),
	date: DateType().isRequired('This field is required.'),
	paidBy: StringType().isRequired('This field is required.'),
	cost: NumberType().isRequired('This field is required.'),
});

export const defaultValue = {
	title: '',
	category: '',
	place: '',
	date: undefined,
	paidBy: '',
	cost: undefined,
};

export const makeFieldSchema = ({ categoryOption, placeOption, memberOption, isCreate }) => [
	{
		name: 'title',
		label: 'Title',
		type: 'input',
	},
	{
		name: 'category',
		label: `Category ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: categoryOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'date',
		label: `Date ${!isCreate ? '(readOnly)' : ''}`,
		type: 'date-picker',
		block: true,
		oneTap: true,
		readOnly: !isCreate,
	},
	{
		name: 'place',
		label: `Place ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: placeOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'paidBy',
		label: `Paid By ${!isCreate ? '(readOnly)' : ''}`,
		type: 'select-picker',
		data: memberOption,
		block: true,
		readOnly: !isCreate,
	},
	{
		name: 'cost',
		label: 'Cost',
		type: 'input',
	},
];
