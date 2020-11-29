import React, { useState } from 'react';
import { Row, Col, Panel, Button } from 'rsuite';

import { withCache } from '../hoc/index';
import Divider from '../../../components/Divider';
import QuickFormModal from './QuickFormModal';

const QuickFormPanel = (props) => {
  const { templates } = props;
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
  console.log(template, 'templatetemplatetemplatetemplate');

  return (
    <Row>
      <Col>
        <h5>Quick Form</h5>
      </Col>
      <Divider height='10' />
      <Col>
        <Panel bordered>
          {templates.map(({ templateName, ...content }, index) => {
            return (
              <span key={index} style={{ padding: 10 }}><Button onClick={() => openCreateModal(content)} appearance="primary">{templateName}</Button></span>
            );
          })}
        </Panel>
      </Col>
      <QuickFormModal {...createModalProps} />
    </Row >
  );
};

export default withCache(QuickFormPanel);