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

export const makeFieldSchema = ({ categoryOption, placeOption, memberOption }) => [
	{
		name: 'cost',
		label: 'Cost',
		type: 'input',
	},
	{
		name: 'date',
		label: 'Date',
		type: 'date-picker',
		block: true,
		oneTap: true,
	},
	{
		name: 'paidBy',
		label: 'Paid By',
		type: 'select-picker',
		data: memberOption,
		block: true,
	},
	{
		name: 'title',
		label: 'Title',
		type: 'input',
	},
	{
		name: 'category',
		label: 'Category',
		type: 'select-picker',
		data: categoryOption,
		block: true,
	},
	{
		name: 'place',
		label: 'Place',
		type: 'select-picker',
		data: placeOption,
		block: true,
	},
];
