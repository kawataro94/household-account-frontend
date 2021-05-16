import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'rsuite';

import Center from '../../components/Center';
import { LoginContext } from '../../context';
import { useAuthentication, useCreateGroup } from '../../hooks';
import SignUpForm from './widget/Form';
import { buttonMargin, title } from './style';

const SignUp = () => {
	const history = useHistory();
	const [formValue, setFormValue] = useState({
		groupName: '',
		account: '',
		email: '',
		password: '',
	});
	const { fetchGroupId, createMember } = useAuthentication();
	const { create: createGroup } = useCreateGroup();
	const { setIsLogin } = useContext(LoginContext);
	const jumpToSignIn = () => history.push('/signin');

	const signUp = async () => {
		const { email, password, account, groupName } = formValue;
		const groupId = await fetchGroupId({ groupName });

		if (groupId) {
			createMember({ email, password, account, groupId });
			console.log('既存GroupUser');
		}

		if (!groupId) {
			const { data } = await createGroup(groupName);
			createMember({ email, password, account, groupId: data.id });
			console.log('新規GroupUser');
		}

		setIsLogin(false);
		jumpToSignIn();
	};

	const formProps = {
		formValue,
		setFormValue,
	};

	return (
		<Center>
			<h2 css={title}>Sign Up</h2>
			<SignUpForm {...formProps} />
			<div css={buttonMargin}>
				<Button appearance="primary" onClick={signUp}>
					Submit
				</Button>
			</div>
		</Center>
	);
};

export default SignUp;
