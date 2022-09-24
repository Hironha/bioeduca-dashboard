import { useState, useCallback } from 'react';

import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import type { RequestData } from '@interfaces/api/requestData';
import type { IApiError } from '@interfaces/api/error';
import type { IPlantInformation } from '@interfaces/models/plantInformation';

type PlantInformationData = {
	data: IPlantInformation[];
};

export const useFetchPlantInformations = () => {
	const controllers = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestPlantInformations = useCallback(async (): Promise<
		RequestData<IPlantInformation[], IApiError>
	> => {
		try {
			const response = await api.get<PlantInformationData>('/plant-informations', {
				signal: controllers.abortController.signal,
			});
			if (!controllers.isMounted) return controllers.createCanceledData();
			return controllers.createSuccessData(response.data.data);
		} catch (err: any) {
			if (controllers.isAborted || !controllers.isMounted) {
				return controllers.createCanceledData();
			}
			const error = err?.response?.data;
			return controllers.createErrorData(error);
		}
	}, [controllers]);

	const fetchPlantInformations = useCallback(async () => {
		setLoading(true);
		const requestData = await requestPlantInformations();
		setLoading(false);
		return requestData;
	}, [requestPlantInformations]);

	return [loading, fetchPlantInformations] as [boolean, typeof fetchPlantInformations];
};
