import type { NotificationCreator } from '@interfaces/notifications/creator';

const createError: NotificationCreator = (args) => ({
	key: 'create-user-default-error',
	message: 'Aconteceu um erro na criação da conta.',
	duration: 5,
	...args,
});

export const createUserNotifications = {
	error: createError,
};
