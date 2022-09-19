import type { Rule } from 'antd/lib/form';
import { ResetPasswordFormInputs } from '../..';

const emailRules: Rule[] = [
	{
		required: true,
		message: 'Insira seu email',
	},
	{
		type: 'email',
		message: 'Insira um email válido',
	},
];

export const resetPasswordFormRules: { [key in ResetPasswordFormInputs]: Rule[] } = {
	email: emailRules,
};
