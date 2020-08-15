import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/members">About</Link>
        </li>
        <li>
          <Link to="/config">Topics</Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;