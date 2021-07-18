import React from 'react';
import { Row, Col, Panel, FlexboxGrid } from 'rsuite';

import { Divider, Button } from '../../../../../components';
import { gridItem } from '../../../style';

const Component = ({ templates, openCreateForm }) => (
	<Row>
		<Col>
			<h5>クイック入力</h5>
		</Col>
		<Divider height="10" />
		<Col>
			<Panel bordered>
				<FlexboxGrid>
					{templates.map((template) => (
						<FlexboxGrid.Item key={`template_${template.id}`} css={gridItem}>
							<Button onClick={() => openCreateForm(template.id)}>{template.title}</Button>
						</FlexboxGrid.Item>
					))}
				</FlexboxGrid>
			</Panel>
		</Col>
	</Row>
);

export default Component;
