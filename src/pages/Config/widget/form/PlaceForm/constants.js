import { Schema } from 'rsuite';

const { StringType } = Schema.Types;
export const model = Schema.Model({
	name: StringType().isRequired('This field is required.'),
});

export const defaultValue = {
	name: '',
};

export const fieldSchema = [
	{
		name: 'name',
		label: '購入場所',
		type: 'input',
	},
];
