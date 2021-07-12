import { Schema } from 'rsuite';

const { StringType } = Schema.Types;
export const model = Schema.Model({
	title: StringType().isRequired('This field is required.'),
	category: StringType().isRequired('This field is required.'),
	place: StringType().isRequired('This field is required.'),
});

export const defaultValue = {
	title: '',
	category: '',
	place: '',
};

export const makeFieldSchema = ({ categoryOption, placeOption }) => [
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
