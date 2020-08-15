import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Config from './pages/Config';
import Members from './pages/Members';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/members" component={Members} />
          <Route path="/config" component={Config} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;