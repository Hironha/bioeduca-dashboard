import { type IApiError } from '@interfaces/api/error';
import { type NotificationCreator } from '@interfaces/notifications/creator';

const createError: NotificationCreator = (args) => ({
	key: 'create-user-error',
	message: 'Aconteceu um erro na criação da conta',
	duration: 5,
	...args,
});

const createSuccess: NotificationCreator = (args) => ({
	key: 'create-user-success',
	message: 'Usuário criado com sucesso',
	duration: 3,
	...args,
});

const emailAlreadyUsedError: IApiError = {
	code: 'CUR-011',
	message: 'Email já cadastrado. Utilize um outro email para cadastro',
};

const possibleErrors: IApiError[] = [emailAlreadyUsedError];

const mapError = (errCode?: string) => {
	const error = possibleErrors.find((error) => error.code === errCode);
	return createError({ ...(error && { message: error.message }) });
};

export const createUserNotifications = {
	error: mapError,
	success: createSuccess,
};
