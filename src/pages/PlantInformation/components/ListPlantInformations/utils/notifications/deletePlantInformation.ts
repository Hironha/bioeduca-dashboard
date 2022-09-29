import type { NotificationCreator } from '@interfaces/notifications/creator';

const deletePlantInformationError: NotificationCreator = (args) => ({
	key: 'delete-plant-information-error',
	message: 'Aconteceu um erro ao excluir a informação das plantas',
	duration: 5,
	...args,
});

const deletePlantInformationSuccess: NotificationCreator = (args) => ({
	key: 'delete-plant-information-success',
	message: 'Informação das plantas excluída com sucesso',
	duration: 5,
	...args,
});

export const deletePlantInformationNotifications = {
	error: deletePlantInformationError,
	success: deletePlantInformationSuccess,
};
