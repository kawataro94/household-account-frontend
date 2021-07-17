import React, { useMemo } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';

const SummaryByMembers = () => {
	const { fetchCollectionByMembers, fetchMembers } = useFetchData();
	const [{ data: collectionByMembers }, { data: members }] = useQueries([
		{ queryKey: 'collectionByMembers', queryFn: fetchCollectionByMembers },
		{ queryKey: 'members', queryFn: fetchMembers },
	]);

	const memberColumns = useMemo(
		() => (members || []).map((member) => ({ id: member.id, name: member.account })),
		[members]
	);

	return <Container {...{ data: collectionByMembers, columns: memberColumns }} />;
};

export default SummaryByMembers;
