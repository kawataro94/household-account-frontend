import React from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import { makeCategoryOption } from '../../../../../looksup';
import { categoryTag } from '../../../style';
import Container from '../container';

const Category = ({ category, categoryOption }) => {
	const { label, color } = categoryOption.find(({ value }) => category === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const makeColumns = ({ categoryOption }) => [
	{
		header: 'タイトル',
		key: 'title',
	},
	{
		header: 'カテゴリ',
		cell: function getCategory({ category }) {
			return <Category {...{ category, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		key: 'place',
	},
];

const TemplateTable = () => {
	const { fetchCategories, fetchTemplates } = useFetchData();
	const [{ data: categories }, { data: templates }] = useQueries([
		{ queryKey: 'categories', queryFn: fetchCategories, suspense: true },
		{ queryKey: 'templates', queryFn: fetchTemplates, suspense: true },
	]);
	const categoryOption = makeCategoryOption(categories);
	const columns = makeColumns({ categoryOption });

	return <Container {...{ data: templates, columns }} />;
};

export default TemplateTable;
