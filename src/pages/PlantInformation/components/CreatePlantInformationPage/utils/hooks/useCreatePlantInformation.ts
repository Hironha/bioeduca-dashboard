import { useState, useCallback } from 'react';
import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import type { RequestData } from '@interfaces/api/requestData';
import type { IApiError } from '@interfaces/api/error';

export type CreatePlantInformationValues = {
	field_name: string;
	description: string;
};

export const useCreatePlantInformation = () => {
	const [controllers] = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestCreatePlantInformation = useCallback(
		async (values: CreatePlantInformationValues): Promise<RequestData<null, IApiError>> => {
			try {
				await api.post('/plant-informations', values);
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

	const createPlantInformation = useCallback(
		async (values: CreatePlantInformationValues) => {
			setLoading(true);
			const requestData = await requestCreatePlantInformation(values);
			setLoading(false);
			return requestData;
		},
		[requestCreatePlantInformation]
	);

	return [loading, createPlantInformation] as [boolean, typeof createPlantInformation];
};
