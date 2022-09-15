import { useNavigate } from 'react-router-dom';
import { Form, Col, Input, Button, Space, notification } from 'antd';

import { FormTitle, FormRow, LockIcon, UnlockIcon, FormContainer, FormActionsCol } from '../styles';

import { useCreateUser, type CreateUserValues } from './hooks/useCreateUser';
import { createUserNotifications } from './notifications/createUser';

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
	const [{ isSubmitting }, createUser] = useCreateUser();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmit = async (values: SignupFormValues) => {
		const handleError = () => {
			const notificationArgs = createUserNotifications.error.default();
			notification.error(notificationArgs);
		};

		const payload: CreateUserValues = {
			email: values.email,
			password: values.password,
		};

		await createUser(payload, { onError: handleError });
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

						<Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
							Criar
						</Button>
					</FormActionsCol>
				</FormRow>
			</Form>
		</FormContainer>
	);
};
