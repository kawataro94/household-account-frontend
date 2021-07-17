import React, { useMemo } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';

import { makeCategoryOption } from '../../../../../looksup';

const SummaryByMembers = () => {
	const { fetchCollectionByCategories, fetchCategories } = useFetchData();
	const [{ data: collectionByCategories }, { data: categories }] = useQueries([
		{ queryKey: 'collectionByCategories', queryFn: fetchCollectionByCategories },
		{ queryKey: 'categories', queryFn: fetchCategories },
	]);

	const categoryOption = useMemo(() => makeCategoryOption(categories), [categories]);
	const categoryColumns = useMemo(
		() =>
			(categories || []).map((category) => ({
				id: category.id,
				name: category.name,
				color: categoryOption.find((option) => option.label === category.name).color,
			})),
		[categories, categoryOption]
	);

	return <Container {...{ data: collectionByCategories, columns: categoryColumns }} />;
};

export default SummaryByMembers;
