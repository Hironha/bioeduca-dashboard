import type { Rule } from 'antd/lib/form';
import { SignupFormInputs } from '../..';

const emailRules: Rule[] = [
	{
		required: true,
		message: 'Insira seu email!',
	},
	{
		type: 'email',
		message: 'Insira um email válido!',
	},
];

const passwordRules: Rule[] = [
	{
		required: true,
		message: 'Insira sua senha!',
	},
	{
		min: 8,
		message: 'Sua senha deve conter, no mínimo, 8 caracteres!',
	},
];

const passwordConfirmRules: Rule[] = [
	{
		required: true,
		message: 'Confirme sua senha!',
	},
	({ getFieldValue }) => ({
		validator(_, value) {
			if (!value || getFieldValue(SignupFormInputs.PASSWORD) === value) {
				return Promise.resolve();
			}
			return Promise.reject('As senhas devem ser iguais!');
		},
	}),
];

export const signupFormRules: { [key in SignupFormInputs]: Rule[] } = {
	email: emailRules,
	password: passwordRules,
	passwordConfirm: passwordConfirmRules,
};
