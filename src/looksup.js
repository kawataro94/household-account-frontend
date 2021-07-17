import React from 'react';
import { Icon } from 'rsuite';

export const categoryOption = [
	{ label: '食費', value: 'food_expenses', color: '#fddede' },
	{ label: '生活用品', value: 'living_expenses', color: '#faddeb' },
	{ label: '家賃', value: 'rent', color: '#dfd6ef' },
	{ label: '電気', value: 'electric_bill', color: '#dce9f7' },
	{ label: '水道', value: 'water_bill', color: '#ddece7' },
	{ label: 'ガス', value: 'gas_bill', color: '#fbeed5' },
	{ label: 'その他', value: 'others', color: '#e6e6e5' },
];

export const colors = {
	orange: '#fddede',
	red: '#faddeb',
	purple: '#dfd6ef',
	blue: '#dce9f7',
	green: '#ddece7',
	yellow: '#fbeed5',
	gray: '#e6e6e5',
};

export const colorOption = [
	'#fddede',
	'#faddeb',
	'#dfd6ef',
	'#dce9f7',
	'#ddece7',
	'#fbeed5',
	'#e6e6e5',
	'#FF6900',
	'#FCB900',
	'#7BDCB5',
	'#00D084',
	'#8ED1FC',
	'#0693E3',
	'#ABB8C3',
	'#EB144C',
	'#F78DA7',
	'#9900EF',
];

export const makeMemberOption = (members) => {
	const option = members.map(({ account }) => ({
		label: account,
		value: account,
	}));

	return option;
};

export const makeCategoryOption = (categories) => {
	const option = categories?.map(({ name, color }) => ({
		label: name,
		value: name,
		color,
	}));

	return option;
};

export const makePlaceOption = (places) => {
	const option = places?.map(({ name }) => ({
		label: name,
		value: name,
	}));

	return option;
};

export const navItems = [
	{
		title: 'Dashboard',
		eventKey: 'dashboard',
		icon: <Icon icon="dashboard" size="3x" />,
		to: '/',
	},
	{
		title: 'Records',
		eventKey: 'records',
		icon: <Icon icon="table" size="5x" />,
		to: '/records',
	},
	{
		title: 'Summary',
		eventKey: 'summary',
		icon: <Icon icon="target" size="5x" />,
		to: '/summary',
	},
	{
		title: 'Members',
		eventKey: 'members',
		icon: <Icon icon="user" size="5x" />,
		to: '/members',
	},
	{
		title: 'Config',
		eventKey: 'config',
		icon: <Icon icon="gear-circle" size="5x" />,
		to: '/config',
	},
];
