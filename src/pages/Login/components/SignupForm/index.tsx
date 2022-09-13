import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Input, Button, Space } from 'antd';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { FormTitle, FormRow, LockIcon, UnlockIcon, FormContainer, FormActionsCol } from '../styles';

enum SignupFormInputs {
	EMAIL = 'email',
	PASSWORD = 'password',
	PASSWORD_CONFIRM = 'passwordConfirm',
}

type SignupFormValues = {
	[SignupFormInputs.EMAIL]: string;
	[SignupFormInputs.PASSWORD]: string;
	[SignupFormInputs.PASSWORD_CONFIRM]: string;
};

export const SignupForm = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm<SignupFormValues>();
	const [submitting, setSubmitting] = useState(false);

	const handleBackClick = () => {
		navigate(-1);
	};

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
		<FormContainer>
			<Space direction="vertical">
				<FormTitle level={3}>Projeto BioEduca</FormTitle>
				<FormTitle level={5}>Criar uma conta</FormTitle>
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
						<Form.Item label="Email" name={SignupFormInputs.EMAIL}>
							<Input placeholder="youremail@example.com" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item label="Senha" name={SignupFormInputs.PASSWORD}>
							<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item label="Confirmação de senha" name={SignupFormInputs.PASSWORD_CONFIRM}>
							<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
						</Form.Item>
					</Col>

					<FormActionsCol span={24}>
						<Button type="primary" ghost htmlType="button" onClick={handleBackClick}>
							Voltar
						</Button>

						<Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
							Entrar
						</Button>
					</FormActionsCol>
				</FormRow>
			</Form>
		</FormContainer>
	);
};
