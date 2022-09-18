import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, notification } from 'antd';

import { FormTitle, FormContainer, FormActionsWrapper, InputsSpace } from '../styles';

import { useSendResetPasswordEmail } from './utils/hooks/useResetPassword';
import { resetPasswordFormRules } from './utils/validations';
import { resetPasswordNotifications } from './utils/notifications/resetPassword';

export enum ResetPasswordFormInputs {
	EMAIL = 'email',
}

export type ResetPasswordValues = {
	[ResetPasswordFormInputs.EMAIL]: string;
};

export const ResetPasswordForm = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm<ResetPasswordValues>();
	const [isLoading, sendResetPasswordEmail] = useSendResetPasswordEmail();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmitError = () => {
		notification.error(resetPasswordNotifications.error());
	};

	const handleSubmitSuccess = () => {
		notification.success(resetPasswordNotifications.success());
	};

	const handleSubmit = async (values: ResetPasswordValues) => {
		const requestData = await sendResetPasswordEmail(values.email);
		if (requestData.isCanceled) return;
		if (requestData.isError) return handleSubmitError();
		handleSubmitSuccess();
	};

	return (
		<FormContainer>
			<Space direction="vertical">
				<FormTitle level={3}>Projeto BioEduca</FormTitle>
				<FormTitle level={5}>Resetar senha</FormTitle>
			</Space>

			<Form
				requiredMark={false}
				form={form}
				layout="vertical"
				autoComplete="off"
				onFinish={handleSubmit}
			>
				<InputsSpace direction="vertical">
					<Form.Item
						label="Email"
						name={ResetPasswordFormInputs.EMAIL}
						rules={resetPasswordFormRules.email}
					>
						<Input placeholder="youremail@example.com" />
					</Form.Item>

					<FormActionsWrapper>
						<Button type="primary" ghost htmlType="button" onClick={handleBackClick}>
							Voltar
						</Button>

						<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
							Enviar email
						</Button>
					</FormActionsWrapper>
				</InputsSpace>
			</Form>
		</FormContainer>
	);
};
