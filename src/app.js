import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'rsuite/dist/styles/rsuite-default.css';

import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Summary from './pages/Summary';
import Members from './pages/Members';
import Config from './pages/Config';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/records" component={Records} />
            <Route path="/summary" component={Summary} />
            <Route path="/members" component={Members} />
            <Route path="/config" component={Config} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;