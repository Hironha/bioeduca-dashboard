import { useState, useCallback } from 'react';

import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import { type AxiosError } from 'axios';
import { type IPlant } from '@interfaces/models/plant';
import { type RequestData } from '@interfaces/api/requestData';

type CreatePlantPayload = FormData;

export const useCreatePlant = () => {
	const [controllers] = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestCreatePlant = useCallback(
		async (payload: CreatePlantPayload): Promise<RequestData<IPlant, AxiosError>> => {
			try {
				const response = await api.post<IPlant>('/plants', payload, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				if (!controllers.isMounted) return controllers.createCanceledData();
				return controllers.createSuccessData(response.data);
			} catch (err) {
				if (controllers.isAborted || !controllers.isMounted) controllers.createCanceledData();
				const error = err as AxiosError;
				return controllers.createErrorData(error);
			}
		},
		[controllers]
	);

	const createPlant = useCallback(
		async (payload: CreatePlantPayload): Promise<RequestData<IPlant, AxiosError>> => {
			setLoading(true);
			const responseValues = await requestCreatePlant(payload);
			setLoading(false);

			return responseValues;
		},
		[requestCreatePlant]
	);

	return [loading, createPlant] as [boolean, typeof createPlant];
};
