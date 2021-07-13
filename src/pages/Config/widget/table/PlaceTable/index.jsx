import React from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';

const columns = [
	{
		header: '購入場所',
		key: 'name',
	},
];

const PlaceTable = () => {
	const { fetchPlaces } = useFetchData();
	const [{ data: places }] = useQueries([{ queryKey: 'places', queryFn: fetchPlaces, suspense: true }]);

	return <Container {...{ data: places, columns }} />;
};

export default PlaceTable;
