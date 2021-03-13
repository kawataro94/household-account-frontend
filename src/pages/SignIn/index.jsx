import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'rsuite';

import Center from '../../components/Center';
import { LoginContext } from '../../context';
import { useAuthentication } from '../../hooks';
import SignInForm from './widget/SignInForm';
import { buttonMargin, title } from './style';

const SignIn = () => {
    const { setIsLogin } = useContext(LoginContext);
    const { checkAuth } = useAuthentication();
    const history = useHistory();
    const jumpToDashboard = () => history.push('/');
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const signIn = () => {
        checkAuth(formValue).then(() => {
            setIsLogin(true);
            jumpToDashboard();
        });
    };

    const formProps = {
        formValue,
        setFormValue,
    };

    return (
        <Center>
            <h2 css={title}>Sign In</h2>
            <SignInForm {...formProps} />
            <div css={buttonMargin}>
                <Button appearance="primary" onClick={() => signIn()}>
					Submit
                </Button>
            </div>
        </Center>
    );
};

export default SignIn;
