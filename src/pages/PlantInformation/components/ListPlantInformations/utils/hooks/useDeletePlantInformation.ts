import { useState, useCallback } from 'react';

import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import type { RequestData } from '@interfaces/api/requestData';
import type { IApiError } from '@interfaces/api/error';

export const useDeletePlantInformation = () => {
	const controllers = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestDeletePlantInformation = useCallback(
		async (id: string): Promise<RequestData<null, IApiError>> => {
			try {
				await api.delete<null>('/plant-informations/' + id, {
					signal: controllers.abortController.signal,
				});
				if (!controllers.isMounted) return controllers.createCanceledData();
				return controllers.createSuccessData(null);
			} catch (err: any) {
				if (controllers.isAborted || !controllers.isMounted) {
					return controllers.createCanceledData();
				}
				const error = err?.response?.data;
				return controllers.createErrorData(error);
			}
		},
		[controllers]
	);

	const deletePlantInformations = useCallback(
		async (id: string) => {
			setLoading(true);
			const requestData = await requestDeletePlantInformation(id);
			setLoading(false);
			return requestData;
		},
		[requestDeletePlantInformation]
	);

	return [loading, deletePlantInformations] as [boolean, typeof deletePlantInformations];
};
