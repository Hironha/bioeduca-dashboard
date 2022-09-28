import type { NotificationCreator } from '@interfaces/notifications/creator';

const listPlantsPreviewError: NotificationCreator = (args) => ({
	key: 'list-plants-preview-error',
	message: 'Aconteceu um erro ao listar as plantas',
	duration: 5,
	...args,
});

export const listPlantsPreviewNotifications = {
	error: listPlantsPreviewError,
};
