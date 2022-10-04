import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, notification } from 'antd';

import {
	FormTitle,
	LockIcon,
	UnlockIcon,
	FormContainer,
	FormActionsWrapper,
	InputsSpace,
} from '../styles';

import { useCreateUser, type CreateUserPayload } from '@services/hooks/user/useCreateUser';
import { createUserNotifications } from './utils/notifications/createUser';
import { signupFormRules } from './utils/validations';

import { type AxiosError } from 'axios';

export enum SignupFormInputs {
	EMAIL = 'email',
	PASSWORD = 'password',
	PASSWORD_CONFIRM = 'passwordConfirm',
}

export type SignupFormValues = {
	[SignupFormInputs.EMAIL]: string;
	[SignupFormInputs.PASSWORD]: string;
	[SignupFormInputs.PASSWORD_CONFIRM]: string;
};

export const SignupForm = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm<SignupFormValues>();
	const createUser = useCreateUser({ retry: false, cacheTime: 0 });

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmitError = (err?: AxiosError<any>) => {
		const errCode = err?.response?.data?.code;
		notification.error(createUserNotifications.error(errCode));
	};

	const handleSubmitSuccess = () => {
		notification.success(createUserNotifications.success());
		form.resetFields();
	};

	const handleSubmit = async (values: SignupFormValues) => {
		const payload: CreateUserPayload = {
			email: values.email,
			password: values.password,
		};
		createUser.mutate(payload, { onError: handleSubmitError, onSuccess: handleSubmitSuccess });
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
				<InputsSpace direction="vertical">
					<Form.Item label="Email" name={SignupFormInputs.EMAIL} rules={signupFormRules.email}>
						<Input placeholder="youremail@example.com" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name={SignupFormInputs.PASSWORD}
						rules={signupFormRules.password}
					>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>

					<Form.Item
						label="Confirmação de senha"
						name={SignupFormInputs.PASSWORD_CONFIRM}
						dependencies={[SignupFormInputs.PASSWORD]}
						rules={signupFormRules.passwordConfirm}
					>
						<Input.Password iconRender={(visible) => (visible ? <UnlockIcon /> : <LockIcon />)} />
					</Form.Item>

					<FormActionsWrapper>
						<Button type="primary" ghost htmlType="button" onClick={handleBackClick}>
							Voltar
						</Button>

						<Button
							type="primary"
							htmlType="submit"
							loading={createUser.isLoading}
							disabled={createUser.isLoading}
						>
							Criar
						</Button>
					</FormActionsWrapper>
				</InputsSpace>
			</Form>
		</FormContainer>
	);
};
