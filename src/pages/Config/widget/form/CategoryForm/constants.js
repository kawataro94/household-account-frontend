import { Schema } from 'rsuite';

const { StringType } = Schema.Types;
export const model = Schema.Model({
	name: StringType().isRequired('This field is required.'),
	color: StringType().isRequired('This field is required.'),
});

export const defaultValue = {
	name: '',
	color: '#fddede',
};

export const fieldSchema = [
	{
		name: 'name',
		label: 'カテゴリ名',
		type: 'input',
	},
	{
		name: 'color',
		label: 'カラー',
		type: 'color-picker',
	},
];
