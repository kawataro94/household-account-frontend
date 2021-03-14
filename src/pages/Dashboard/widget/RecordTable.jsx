import React, { useContext } from 'react';
import { Row, Col, Table, Panel } from 'rsuite';

import Divider from '../../../components/Divider';
import { YenUnit } from '../../../components/Units';
import { categoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { DashboardContext } from '../context';

const { Column, HeaderCell, Cell } = Table;

const Category = ({ category }) => {
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

const MemberName = ({ members, memberId }) => {
	const member = (members || []).find(({ id }) => id === memberId);
	return <span>{member && member.account}</span>;
};

const RecordTable = () => {
	const { members, records } = useContext(DashboardContext);
	const limited = records.slice(0, 5);
	return (
		<Row>
			<Col>
				<h5>最近の記録</h5>
			</Col>
			<Divider height="10" />
			<Panel bordered>
				<Table height={280} data={limited}>
					<Column flexGrow={1}>
						<HeaderCell>日付</HeaderCell>
						<Cell dataKey="date" />
					</Column>
					<Column flexGrow={1}>
						<HeaderCell>タイトル</HeaderCell>
						<Cell dataKey="title" />
					</Column>
					<Column flexGrow={1}>
						<HeaderCell>カテゴリ</HeaderCell>
						<Cell dataKey="category">{({ category }) => <Category category={category} />}</Cell>
					</Column>
					<Column flexGrow={1}>
						<HeaderCell>コスト</HeaderCell>
						<Cell dataKey="cost">{({ cost }) => <Cost cost={cost} />}</Cell>
					</Column>
					<Column flexGrow={1}>
						<HeaderCell>支払った人</HeaderCell>
						<Cell>{({ memberId }) => <MemberName members={members} memberId={memberId} />}</Cell>
					</Column>
				</Table>
			</Panel>
		</Row>
	);
};

export default RecordTable;
