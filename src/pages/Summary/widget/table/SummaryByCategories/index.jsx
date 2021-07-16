import React, { useMemo } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';

const SummaryByMembers = () => {
	const { fetchCollectionByCategories, fetchCategories } = useFetchData();
	const [{ data: collectionByCategories }, { data: categories }] = useQueries([
		{ queryKey: 'collectionByCategories', queryFn: fetchCollectionByCategories },
		{ queryKey: 'categories', queryFn: fetchCategories },
	]);

	const categoryColumns = useMemo(
		() => (categories || []).map((category) => ({ id: category.id, name: category.name })),
		[categories]
	);

	return <Container {...{ data: collectionByCategories, columns: categoryColumns }} />;
};

export default SummaryByMembers;
