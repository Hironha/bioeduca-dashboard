import type { Rule } from 'antd/lib/form';
import { LoginFormInputs } from '../..';

const emailRules: Rule[] = [
	{
		required: true,
		message: 'Insira seu email',
	},
];

const passwordRules: Rule[] = [
	{
		required: true,
		message: 'Insira sua senha',
	},
];

export const loginFormRules: { [key in LoginFormInputs]: Rule[] } = {
	email: emailRules,
	password: passwordRules,
};
