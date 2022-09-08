import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Col, Input, Typography, Button } from 'antd';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginFormTitle, LoginFormRow, LoginActionsCol, LockIcon, UnlockIcon } from './styles';

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
		<Form
			requiredMark={false}
			form={form}
			layout="vertical"
			autoComplete="off"
			onFinish={handleSubmit}
		>
			<LoginFormRow gutter={16}>
				<Col span={24}>
					<LoginFormTitle level={3}>Projeto BioEduca</LoginFormTitle>
				</Col>

				<Col span={24}>
					<Form.Item label="Email" name={LoginFormInputs.EMAIL}>
						<Input placeholder="luizgustavokobilacz@gmail.com" />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item label="Senha" name={LoginFormInputs.PASSWORD}>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>
				</Col>

				<LoginActionsCol span={24}>
					<Link to="/recover-password"  >
						<Typography.Link disabled={submitting}>Esqueci minha senha</Typography.Link>
					</Link>

					<Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
						Entrar
					</Button>
				</LoginActionsCol>
			</LoginFormRow>
		</Form>
	);
};
