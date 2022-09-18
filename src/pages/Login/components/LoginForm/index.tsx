import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { ForgotPasswordText } from './styles';
import {
	FormTitle,
	LockIcon,
	UnlockIcon,
	FormContainer,
	FormActionsWrapper,
	InputsSpace,
} from '../styles';

enum LoginFormInputs {
	EMAIL = 'email',
	PASSWORD = 'password',
}

type LoginFormValues = {
	[LoginFormInputs.EMAIL]: string;
	[LoginFormInputs.PASSWORD]: string;
};

export const LoginForm = () => {
	const [form] = Form.useForm<LoginFormValues>();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (values: LoginFormValues) => {
		try {
			const auth = getAuth();
			setSubmitting(true);

			await signInWithEmailAndPassword(auth, values.email, values.password);

			setTimeout(() => {
				navigate('/');
			}, 500);
		} catch (err) {
			console.log(err);
		}
		setSubmitting(false);
	};

	return (
		<FormContainer>
			<Space direction="vertical">
				<FormTitle level={3}>Projeto BioEduca</FormTitle>
				<FormTitle level={5}>Login</FormTitle>
			</Space>

			<Form
				requiredMark={false}
				form={form}
				layout="vertical"
				autoComplete="off"
				onFinish={handleSubmit}
			>
				<InputsSpace direction="vertical">
					<Form.Item label="Email" name={LoginFormInputs.EMAIL}>
						<Input placeholder="youremail@example.com" />
					</Form.Item>

					<Form.Item label="Senha" name={LoginFormInputs.PASSWORD}>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>

					<FormActionsWrapper>
						<ForgotPasswordText disabled={submitting}>
							<Link to="/reset-password">Esqueci minha senha</Link>
						</ForgotPasswordText>

						<Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
							Entrar
						</Button>
					</FormActionsWrapper>
				</InputsSpace>
			</Form>
		</FormContainer>
	);
};
