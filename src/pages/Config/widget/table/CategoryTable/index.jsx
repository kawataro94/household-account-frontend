import React from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import { categoryTag } from '../../../style';
import Container from '../container';

const Category = ({ color }) => {
	return (
		<div>
			<span css={categoryTag(color)}>{color}</span>
		</div>
	);
};

const columns = [
	{
		header: 'カテゴリ名',
		key: 'name',
	},
	{
		header: 'カラー',
		cell: function getCategory({ color }) {
			return <Category {...{ color }} />;
		},
	},
];

const CategoryTable = () => {
	const { fetchCategories } = useFetchData();
	const [{ data: categories }] = useQueries([{ queryKey: 'categories', queryFn: fetchCategories, suspense: true }]);

	return <Container {...{ data: categories, columns }} />;
};

export default CategoryTable;
