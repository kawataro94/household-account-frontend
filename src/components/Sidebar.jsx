import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Sidenav, Nav } from 'rsuite';

import { navItems } from '../looksup';

const { Body } = Sidenav;
const { Item } = Nav;

const Sidebar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState(pathname.slice(1));

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
          {navItems.map(({ title, to, ...rest }, key) => (
            <Item key={key} onClick={() => toLink(to)} {...rest}>
              {title}
            </Item>
          ))}
        </Nav>
      </Body>
    </Sidenav >
  );
};

export default Sidebar;