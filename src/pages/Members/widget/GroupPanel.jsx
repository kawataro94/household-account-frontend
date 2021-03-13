import React from 'react';
import { Row, Col, Panel, FlexboxGrid, List, Button } from 'rsuite';

import Divider from '../../../components/Divider';

import { height, lineHeight, lineHeightH5, groupLineHeight } from '../style';

const GroupInfomation = () => {
    return (
        <List>
            <List.Item css={height}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={8}>
                        <div css={groupLineHeight}>
                            <div>50000</div>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8}>
                        <div css={groupLineHeight}>
                            <div>10000</div>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8}>
                        <div css={groupLineHeight}>
                            <div>10000</div>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        </List>
    );
};

const GroupPanel = () => {
    return (
        <Row>
            <Col>
                <FlexboxGrid justify="space-between" align="middle">
                    <h5 css={lineHeightH5}>グループ情報</h5>
                    <Button appearance="primary" size="lg">
						編集する
                    </Button>
                </FlexboxGrid>
            </Col>
            <Divider />
            <Divider height="10" />
            <Col>
                <Panel bordered>
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={8}>
                            <div css={lineHeight}>
                                <div>今月の出費目標額</div>
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={8}>
                            <div css={lineHeight}>
                                <div>現時点での出費額</div>
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={8}>
                            <div css={lineHeight}>
                                <div>今月の使用額</div>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <GroupInfomation />
                </Panel>
            </Col>
        </Row>
    );
};

export default GroupPanel;
