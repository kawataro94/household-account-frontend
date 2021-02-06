import React, { useState, useMemo } from 'react';
import { Row, Col, Panel, Button, FlexboxGrid } from 'rsuite';

import { resources } from '../../../resources';
import Divider from '../../../components/Divider';
import QuickFormModal from './QuickFormModal';
import { gridItem } from '../style';

const QuickFormPanel = () => {
  const templates = useMemo(() => resources.templates.read(), [resources]);
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState({});

  const openCreateModal = (content) => {
    setIsOpen(true);
    setTemplate(content);
  };

  const closeCreateModal = () => {
    setIsOpen(false);
    setTemplate({});
  };

  const createModalProps = {
    isOpen,
    template,
    closeCreateModal
  };

  return (
    <Row>
      <Col>
        <h5>クイック入力</h5>
      </Col>
      <Divider height='10' />
      <Col>
        <Panel bordered>
          <FlexboxGrid>
            {templates.map(({ templateName, ...content }, index) => {
              return (
                <FlexboxGrid.Item key={index} css={gridItem}>
                  <Button onClick={() => openCreateModal(content)} appearance="primary">{templateName}</Button>
                </FlexboxGrid.Item>
              );
            })}
          </FlexboxGrid>
        </Panel>
      </Col>
      <QuickFormModal {...createModalProps} />
    </Row >
  );
};

export default QuickFormPanel;