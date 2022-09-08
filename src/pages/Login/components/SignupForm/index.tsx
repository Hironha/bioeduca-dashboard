import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Input, Typography, Button } from 'antd';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { FormTitle, FormRow, FormActionsCol, LockIcon, UnlockIcon } from '../styles';

enum SignupFormInputs {
	EMAIL = 'email',
	PASSWORD = 'password',
	PASSWORD_CONFIRM = 'passwordConfirm',
}

type SignupFormValues = {
	[SignupFormInputs.EMAIL]: string;
	[SignupFormInputs.PASSWORD]: string;
};

export const SignupForm = () => {
	const [form] = Form.useForm<SignupFormValues>();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (values: SignupFormValues) => {
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
			<FormRow gutter={16}>
				<Col span={24}>
					<FormTitle level={3}>Projeto BioEduca</FormTitle>
				</Col>

				<Col span={24}>
					<Form.Item label="Email" name={SignupFormInputs.EMAIL}>
						<Input placeholder="luizgustavokobilacz@gmail.com" />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item label="Senha" name={SignupFormInputs.PASSWORD}>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item label="Confirmação de senha" name={SignupFormInputs.PASSWORD}>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>
				</Col>

				<FormActionsCol span={24}>
					<Typography.Link disabled={submitting}>Esqueci minha senha</Typography.Link>
					<Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
						Criar conta
					</Button>
				</FormActionsCol>
			</FormRow>
		</Form>
	);
};
