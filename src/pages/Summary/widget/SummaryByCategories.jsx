import React from 'react';
import { Table } from 'rsuite';

import { YenUnit } from '../../../components/Units';
import { summaryColumns } from '../../../looksup';
import { categoryTag, costFont } from '../style';

const { ColumnGroup, Column, HeaderCell, Cell } = Table;

const Month = ({ month, year }) => (
    <div>
        {year}-{month < 10 && 0}
        {month}
    </div>
);

const Title = ({ name }) => {
    const { label, color } = summaryColumns.find(({ value }) => name === value) || {};
    return (
        <div>
            <span css={categoryTag(color)}>{label}</span>
        </div>
    );
};

const Cost = ({ value }) => {
    return (
        <>
            <span css={costFont}>{value}</span>
            <YenUnit style="font-size: 12px;" />
        </>
    );
};

const SummaryByCategories = ({ monthlyExpenses }) => {
    return (
        <Table height={500} data={monthlyExpenses} bordered cellBordered headerHeight={80}>
            <Column width={100} align="center" fixed="left">
                <HeaderCell></HeaderCell>
                <Cell>{({ month, year }) => <Month {...{ month, year }} />}</Cell>
            </Column>
            <Column width={100} align="center" fixed="left">
                <HeaderCell>
                    <Title name="total" />
                </HeaderCell>
                <Cell>
                    {({ total }) => (
                        <strong>
                            <Cost value={total} />
                        </strong>
                    )}
                </Cell>
            </Column>
            <Column width={130} align="right">
                <HeaderCell>
                    <Title name="foodExpenses" />
                </HeaderCell>
                <Cell>{({ foodExpenses }) => <Cost value={foodExpenses} />}</Cell>
            </Column>
            <Column width={130} align="right">
                <HeaderCell>
                    <Title name="livingExpenses" />
                </HeaderCell>
                <Cell>{({ livingExpenses }) => <Cost value={livingExpenses} />}</Cell>
            </Column>
            <ColumnGroup header={<Title name="rent" />} align="right">
                <Column width={130} colSpan={2}>
                    <HeaderCell>支払い分</HeaderCell>
                    <Cell dataKey="rentMonth" />
                </Column>
                <Column width={130}>
                    <HeaderCell>費用</HeaderCell>
                    <Cell>{({ rent }) => <Cost value={rent} />}</Cell>
                </Column>
            </ColumnGroup>
            <ColumnGroup header={<Title name="electricBill" />} align="right">
                <Column width={130} colSpan={2}>
                    <HeaderCell>支払い分</HeaderCell>
                    <Cell dataKey="rentMonth" />
                </Column>
                <Column width={130}>
                    <HeaderCell>費用</HeaderCell>
                    <Cell>{({ electricBill }) => <Cost value={electricBill} />}</Cell>
                </Column>
            </ColumnGroup>
            <ColumnGroup header={<Title name="waterBill" />} align="right">
                <Column width={130} colSpan={2}>
                    <HeaderCell>支払い分</HeaderCell>
                    <Cell dataKey="rentMonth" />
                </Column>
                <Column width={130}>
                    <HeaderCell>費用</HeaderCell>
                    <Cell>{({ waterBill }) => <Cost value={waterBill} />}</Cell>
                </Column>
            </ColumnGroup>
            <ColumnGroup header={<Title name="gasBill" />} align="right">
                <Column width={130} colSpan={2}>
                    <HeaderCell>支払い分</HeaderCell>
                    <Cell dataKey="rentMonth" />
                </Column>
                <Column width={130}>
                    <HeaderCell>費用</HeaderCell>
                    <Cell>{({ gasBill }) => <Cost value={gasBill} />}</Cell>
                </Column>
            </ColumnGroup>
            <Column width={130} align="right">
                <HeaderCell>
                    <Title name="others" />
                </HeaderCell>
                <Cell>{({ others }) => <Cost value={others} />}</Cell>
            </Column>
        </Table>
    );
};

export default SummaryByCategories;
