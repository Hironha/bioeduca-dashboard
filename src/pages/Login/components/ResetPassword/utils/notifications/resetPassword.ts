import type { NotificationCreator } from '@interfaces/notifications/creator';

const resetPasswordError: NotificationCreator = (args) => ({
	key: 'reset-password-error',
	message: 'Aconteceu um erro ao enviar o email de reset de senha',
	duration: 5,
	...args,
});

const resetPasswordSuccess: NotificationCreator = (args) => ({
	key: 'reset-password-success',
	message: 'Email para troca de senha enviado com sucesso',
	duration: 3,
	...args,
});

export const resetPasswordNotifications = {
	error: resetPasswordError,
	success: resetPasswordSuccess,
};
