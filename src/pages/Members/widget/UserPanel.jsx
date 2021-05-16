import React from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

import Divider from '../../../components/Divider';
import SectionTitle from '../../../components/SectionTitle';
import UserList from './UserList';
import { lineHeight, gridItem } from '../style';

const UserPanel = () => {
	const createButtonProps = {
		buttonText: '追加する',
		// onClick: () => openCreateEditModal(),
		onClick: () => {},
	};

	return (
		<Row>
			<SectionTitle title="メンバー情報" {...createButtonProps} />
			<Divider height="10" />
			<Col>
				<Panel bordered>
					<FlexboxGrid>
						<FlexboxGrid.Item colspan={6} css={gridItem}>
							<div css={lineHeight}>ユーザー名</div>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item colspan={5}>
							<div css={lineHeight}>
								<div>今月の出費目標額</div>
							</div>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item colspan={5}>
							<div css={lineHeight}>
								<div>現時点での出費額</div>
							</div>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item colspan={5}>
							<div css={lineHeight}>
								<div>今月の使用額</div>
							</div>
						</FlexboxGrid.Item>
					</FlexboxGrid>
					<UserList />
				</Panel>
			</Col>
		</Row>
	);
};

export default UserPanel;
