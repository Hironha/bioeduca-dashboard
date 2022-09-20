import type { NotificationCreator } from '@interfaces/notifications/creator';

const fetchPlantInformationsError: NotificationCreator = (args) => ({
	key: 'fetch-plant-informations-error',
	message: 'Aconteceu um erro ao listar as informação das plantas',
	duration: 5,
	...args,
});

export const fetchPlantInformationsNotifications = {
	error: fetchPlantInformationsError,
};
