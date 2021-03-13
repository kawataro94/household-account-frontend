import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import { css } from '@emotion/react';

import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Summary from './pages/Summary';
import Members from './pages/Members';
import Config from './pages/Config';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { Provider, LoginContext } from './context';

const flex = css`
	display: flex;
`;

const AuthTheme = ({ children }) => {
    return (
        <>
            <Navbar />
            <div css={flex}>
                <Sidebar />
                {children}
            </div>
        </>
    );
};

const AuthDashboard = () => (
    <AuthTheme>
        <Dashboard />
    </AuthTheme>
);
const AuthRecords = () => (
    <AuthTheme>
        <Records />
    </AuthTheme>
);
const AuthSummary = () => (
    <AuthTheme>
        <Summary />
    </AuthTheme>
);
const AuthMembers = () => (
    <AuthTheme>
        <Members />
    </AuthTheme>
);
const AuthConfig = () => (
    <AuthTheme>
        <Config />
    </AuthTheme>
);

const Routes = () => {
    const { isLogin } = useContext(LoginContext);
    return (
        <>
            {isLogin ? (
                <>
                    <Route exact path="/" component={AuthDashboard} />
                    <Route path="/records" component={AuthRecords} />
                    <Route path="/summary" component={AuthSummary} />
                    <Route path="/members" component={AuthMembers} />
                    <Route path="/config" component={AuthConfig} />
                </>
            ) : (
                <>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                </>
            )}
        </>
    );
};

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Provider>
                        <Routes />
                    </Provider>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
