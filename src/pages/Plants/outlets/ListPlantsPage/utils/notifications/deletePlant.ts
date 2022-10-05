import type { NotificationCreator } from '@interfaces/notifications/creator';

const deletePlantError: NotificationCreator = (args) => ({
	key: 'delete-plant-error',
	message: 'Aconteceu um erro ao excluir a planta',
	duration: 5,
	...args,
});

const deletePlantSuccess: NotificationCreator = (args) => ({
	key: 'delete-plant-success',
	message: 'Planta excluída com sucesso',
	duration: 5,
	...args,
});

export const deletePlantNotifications = {
	error: deletePlantError,
	success: deletePlantSuccess,
};
