import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar, Nav, Icon } from 'rsuite';

import { LoginContext } from '../context';
import { useAuthentication } from '../hooks';
import { navStyle } from './style';

const Header = () => {
    const { setIsLogin } = useContext(LoginContext);
    const history = useHistory();
    const { pathname } = useLocation();
    const { clearSession, clearStorage } = useAuthentication();
    const jumpToDashboard = () => history.push('/');
    const jumpToRecords = () => history.push('/records');
    const jumpToSignIn = () => history.push('/signin');

    const signOut = async () => {
        await clearSession();
        await clearStorage();
        setIsLogin(false);
        jumpToSignIn();
    };

    return (
        <Navbar appearance="subtle">
            <Navbar.Header>
                <a href="#" css={navStyle}>
					Household Account
                </a>
            </Navbar.Header>
            <Nav pullRight activeKey={pathname}>
                <Nav.Item
                    className="mobile-menu"
                    eventKey="/"
                    icon={<Icon icon="dashboard" size="2x" />}
                    onClick={jumpToDashboard}
                ></Nav.Item>
                <Nav.Item
                    className="mobile-menu"
                    eventKey="/records"
                    icon={<Icon icon="table" size="2x" />}
                    onClick={jumpToRecords}
                ></Nav.Item>
                <Nav.Item icon={<Icon icon="sign-out" size="2x" />} onClick={signOut}></Nav.Item>
            </Nav>
        </Navbar>
    );
};

export default Header;
