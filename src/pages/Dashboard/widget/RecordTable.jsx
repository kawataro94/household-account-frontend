import React, { useContext } from 'react';
import { Row, Col, Panel } from 'rsuite';

import { Divider, Table } from '../../../components';
import { YenUnit } from '../../../components/Units';
import { makeCategoryOption } from '../../../looksup';
import { categoryTag } from '../style';
import { DashboardContext } from '../context';

const Category = ({ category, categoryOption }) => {
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

const makeColumns = ({ categoryOption }) => [
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
		cell: function getCategory({ category }) {
			return <Category {...{ category, categoryOption }} />;
		},
	},
	{
		header: '購入場所',
		key: 'place',
	},
	{
		header: 'コスト',
		cell: function getCost({ cost }) {
			return <Cost {...{ cost }} />;
		},
	},
	{
		header: '支払った人',
		key: 'paidBy',
	},
];

const RecordTable = () => {
	const { records, categories } = useContext(DashboardContext);
	const categoryOption = makeCategoryOption(categories);
	const limited = records?.slice(0, 10) || [];

	const tableProps = {
		data: limited,
		rowHeight: 57,
		shouldUpdateScroll: false,
		columns: makeColumns({ categoryOption }),
	};

	return (
		<Row>
			<Col>
				<h5>最近の記録</h5>
			</Col>
			<Divider height="10" />
			<Panel bordered>
				<Table height={250} {...tableProps} />
			</Panel>
		</Row>
	);
};

export default RecordTable;
