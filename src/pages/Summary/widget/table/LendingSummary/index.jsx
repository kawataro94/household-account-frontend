import React, { useMemo } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';

const LendingSummary = () => {
	const { fetchLendingCollection, fetchMembers } = useFetchData();
	const [{ data: lendingCollection }, { data: members }] = useQueries([
		{ queryKey: 'lendingCollection', queryFn: fetchLendingCollection },
		{ queryKey: 'members', queryFn: fetchMembers },
	]);

	const memberColumns = useMemo(
		() => (members || []).map((member) => ({ id: member.id, name: member.account })),
		[members]
	);

	return <Container {...{ data: lendingCollection, columns: memberColumns }} />;
};

export default LendingSummary;
