import React from 'react';
import { useQueries } from 'react-query';

import { YenUnit } from '../../../../../components/Units';
import { useFetchData } from '../../../../../hooks';
import { makeCategoryOption } from '../../../../../looksup';
import { categoryTag } from '../../../style';
import Container from '../container';

const Category = ({ category, categoryOption = [] }) => {
	const { label, color } = categoryOption.find(({ value }) => category === value) || {};
	return (
		<div>
			<span css={categoryTag(color)}>{label}</span>
		</div>
	);
};

const Cost = ({ cost }) => (
	<span>
		{cost}
		<YenUnit />
	</span>
);

const makeColumns = ({ categoryOption }) => [
	{
		header: '日付',
		key: 'date',
	},
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
	{
		header: 'コスト',
		cell: function getCost({ cost }) {
			return <Cost {...{ cost }} />;
		},
	},
	{
		header: '支払った人',
		key: 'paidBy',
	},
];

const RecordTable = () => {
	const { fetchRecords, fetchCategories } = useFetchData();
	const [{ data: records }, { data: categories }] = useQueries([
		{ queryKey: 'records', queryFn: fetchRecords },
		{ queryKey: 'categories', queryFn: fetchCategories },
	]);
	const categoryOption = makeCategoryOption(categories);
	const columns = makeColumns({ categoryOption });

	return <Container {...{ data: records, columns }} />;
};

export default RecordTable;
