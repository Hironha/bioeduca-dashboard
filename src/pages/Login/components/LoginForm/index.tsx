import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Col, Input, Button, Space } from 'antd';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { ForgotPasswordText } from './styles';
import { FormTitle, FormRow, LockIcon, UnlockIcon, FormContainer, FormActionsCol } from '../styles';

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
				<FormRow>
					<Col span={24}>
						<Form.Item label="Email" name={LoginFormInputs.EMAIL}>
							<Input placeholder="youremail@example.com" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item label="Senha" name={LoginFormInputs.PASSWORD}>
							<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
						</Form.Item>
					</Col>

					<FormActionsCol span={24}>
						<ForgotPasswordText disabled={submitting}>
							<Link to="/recover-password">Esqueci minha senha</Link>
						</ForgotPasswordText>

						<Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
							Entrar
						</Button>
					</FormActionsCol>
				</FormRow>
			</Form>
		</FormContainer>
	);
};
