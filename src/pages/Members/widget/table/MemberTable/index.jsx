import React from 'react';
import { useQueries } from 'react-query';
import { Icon } from 'rsuite';

import { useFetchData } from '../../../../../hooks';
import Container from '../container';
import { marginLeft } from '../../../style';

const columns = [
	{
		header: 'ユーザー名',
		cell: function makeMember({ account }) {
			return (
				<>
					<Icon icon="user-circle-o" size="lg" />
					<span css={marginLeft}>{account}</span>
				</>
			);
		},
	},
];

const MemberTable = () => {
	const { fetchMembers } = useFetchData();
	const [{ data: members }] = useQueries([{ queryKey: 'members', queryFn: fetchMembers }]);

	return <Container {...{ data: members, columns }} />;
};

export default MemberTable;
