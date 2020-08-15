import React from 'react';
import { Link } from "react-router-dom";
import { Sidenav, Nav } from 'rsuite';

const Sidebar = () => {
  return (
    <Sidenav style={{ width: 250, height: 'calc(100vh - 56px)' }}>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" icon={null}>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item eventKey="2" icon={null}>
            <Link to="/members">Members</Link>
          </Nav.Item>
          <Nav.Item eventKey="3" icon={null}>
            <Link to="/config">Config</Link>
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav >
  );
};

export default Sidebar;