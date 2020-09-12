import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Sidenav, Nav, Icon } from 'rsuite';

const { Body } = Sidenav;
const { Item } = Nav;
const Sidebar = () => {

  const history = useHistory();
  const [activeKey, setActiveKey] = useState('1');

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };

  const toLink = (to) => {
    history.push(to);
  };

  return (
    <Sidenav activeKey={activeKey} onSelect={handleSelect} style={{ width: 250, height: 'calc(100vh - 56px)' }}>
      <Body>
        <Nav>
          <Item eventKey='1' icon={<Icon icon='dashboard' size='3x' />} onClick={() => toLink('/')}>
            Dashboard
          </Item>
          <Item eventKey='2' icon={<Icon icon='user' size='5x' />} onClick={() => toLink('/members')}>
            Members
          </Item>
          <Item eventKey='3' icon={<Icon icon='table' size='5x' />} onClick={() => toLink('/records')}>
            Records
          </Item>
          <Item eventKey='4' icon={<Icon icon='gear-circle' size='5x' />} onClick={() => toLink('/config')}>
            Config
          </Item>
        </Nav>
      </Body>
    </Sidenav >
  );
};

export default Sidebar;