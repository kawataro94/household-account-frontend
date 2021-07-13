import React from 'react';
import { useQueries } from 'react-query';

import PageComponent from './component';
import { useFetchData } from '../../hooks';

const Container = () => {
	const { fetchCategories, fetchPlaces, fetchTemplates } = useFetchData();
	useQueries([
		{ queryKey: 'categories', queryFn: fetchCategories, suspense: true },
		{ queryKey: 'places', queryFn: fetchPlaces, suspense: true },
		{ queryKey: 'templates', queryFn: fetchTemplates, suspense: true },
		{ queryKey: 'templates', queryFn: fetchTemplates, suspense: true },
	]);

	return <PageComponent />;
};

export default Container;
