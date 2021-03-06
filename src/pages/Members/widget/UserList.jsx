import React, { useContext } from 'react';
import { List, FlexboxGrid, Icon } from 'rsuite';

import { lineHeight, marginLeft, list, gridItem } from '../style';
import { MembersContext } from '../context';

const UserList = () => {
	const { members } = useContext(MembersContext);

	return (
		<List hover css={list}>
			{members.map((member, index) => {
				const { account } = member;
				const { target = 100, paid = 100, left = 100 } = members[index];
				return (
					<List.Item key={index}>
						<FlexboxGrid>
							<FlexboxGrid.Item colspan={6} css={gridItem}>
								<div css={lineHeight}>
									<Icon icon="user-circle-o" size="lg" />
									<span css={marginLeft}>{account}</span>
								</div>
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={5}>
								<div css={lineHeight}>
									<div>{target}</div>
								</div>
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={5}>
								<div css={lineHeight}>
									<div>{paid}</div>
								</div>
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={5}>
								<div css={lineHeight}>
									<div>{left}</div>
								</div>
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</List.Item>
				);
			})}
		</List>
	);
};

export default UserList;
