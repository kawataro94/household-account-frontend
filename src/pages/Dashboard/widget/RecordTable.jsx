import React, { useContext } from 'react';
import { Row, Col, Panel } from 'rsuite';

import { Divider, Table } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeMemberOption, makeCategoryOption, makePlaceOption } from '../../../looksup';
import { categoryTag } from '../style';
import { DashboardContext } from '../context';

const Category = ({ categoryId, categoryOption }) => {
	const { label, color } = categoryOption?.find(({ value }) => categoryId === value) || {};
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

const Place = ({ placeId, placeOption }) => {
	const { label } = placeOption.find(({ value }) => Number(placeId) === value) || {};
	return (
		<div>
			<span>{label}</span>
		</div>
	);
};

const MemberName = ({ memberId, memberOption }) => {
	const member = (memberOption || []).find(({ value }) => value === memberId);
	return <span>{member && member.label}</span>;
};

const makeColumns = ({ memberOption, categoryOption, placeOption }) => [
	{
		header: '日付',
		key: 'date',
	},
	{
		header: 'タイトル',
		key: 'title',
	},
	{
		header: 'カテゴリ',
		cell: function getCategory({ categoryId }) {
			return <Category {...{ categoryId, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		cell: function getPlace({ placeId }) {
			return <Place {...{ placeId, placeOption }} />;
		},
	},
	{
		header: 'コスト',
		cell: function getCost({ cost }) {
			return <Cost {...{ cost }} />;
		},
	},
	{
		header: '支払った人',
		cell: function getMemberName({ memberId }) {
			return <MemberName {...{ memberId, memberOption }} />;
		},
	},
];

const RecordTable = () => {
	const { members, records, categories, places } = useContext(DashboardContext);
	const memberOption = makeMemberOption(members);
	const categoryOption = makeCategoryOption(categories);
	const placeOption = makePlaceOption(places);
	const limited = records?.slice(0, 5) || [];

	const tableProps = {
		height: 520,
		data: limited,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ memberOption, categoryOption, placeOption }),
	};

	return (
		<Row>
			<Col>
				<h5>最近の記録</h5>
			</Col>
			<Divider height="10" />
			<Panel bordered>
				<Table height={280} {...tableProps} />
			</Panel>
		</Row>
	);
};

export default RecordTable;
