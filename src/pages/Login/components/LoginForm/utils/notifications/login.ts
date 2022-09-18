import type { NotificationCreator } from '@interfaces/notifications/creator';

const loginError: NotificationCreator = (args) => ({
	key: 'login-default-error',
	message: 'Usuário e/ou senha incorretos',
	duration: 5,
	...args,
});

export const loginNotifications = {
	error: loginError,
};
