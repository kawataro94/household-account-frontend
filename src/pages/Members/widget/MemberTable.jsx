import React, { useContext } from 'react';
import { Row, Col, Panel, Icon } from 'rsuite';

import { SectionTitle, Table } from '../../../components';
import { marginLeft } from '../style';
import { MembersContext } from '../context';

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
	const { members } = useContext(MembersContext);

	const tableProps = {
		data: members,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns,
	};

	return (
		<Row>
			<Col>
				<SectionTitle title="メンバー情報" />
			</Col>
			<Panel bordered>
				<Table {...tableProps} />
			</Panel>
		</Row>
	);
};

export default MemberTable;
