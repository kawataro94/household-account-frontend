import React from 'react';
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon } from 'rsuite';

const Sidebar = () => {
  return (
    <Sidenav style={{ width: 250, height: 'calc(100vh - 56px)' }}>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" icon={<Icon icon='dashboard' size='3x' />}>
            <Link to="/">Dashboard</Link>
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<Icon icon='user' size='5x' />}>
            <Link to="/members">Members</Link>
          </Nav.Item>
          <Nav.Item eventKey="3" icon={<Icon icon='gear-circle' size='5x' />}>
            <Link to="/config">Config</Link>
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav >
  );
};

export default Sidebar;