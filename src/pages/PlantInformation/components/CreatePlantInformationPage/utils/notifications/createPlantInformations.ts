import type { NotificationCreator } from '@interfaces/notifications/creator';

const createPlantInformationError: NotificationCreator = (args) => ({
	key: 'create-plant-information-error',
	message: 'Aconteceu um erro ao cadastrar a informação das plantas',
	duration: 5,
	...args,
});

const createPlantInformationSuccess: NotificationCreator = (args) => ({
	key: 'reset-password-success',
	message: 'Informação das plantas cadastrada com sucesso',
	duration: 3,
	...args,
});

export const createPlantInformationNotifications = {
	error: createPlantInformationError,
	success: createPlantInformationSuccess,
};
