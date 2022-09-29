import { useState, useCallback } from 'react';
import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import { type IApiError } from '@interfaces/api/error';
import { type RequestData } from '@interfaces/api/requestData';
import { type IPlantPreview } from '@interfaces/models/plant';

export type ListPlantsPreviewResponse = {
	hasMore: boolean;
	lastKey?: string;
	data: IPlantPreview[];
};

type ListPlantsPreviewProps = {
	plantsPerPage: number;
};

export const useListPlantsPreview = ({ plantsPerPage }: ListPlantsPreviewProps) => {
	const [controllers] = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestListPlantsPreview = useCallback(
		async (lastKey?: string): Promise<RequestData<ListPlantsPreviewResponse, IApiError>> => {
			const signal = controllers.abortController.signal;
			try {
				const response = await api.get<ListPlantsPreviewResponse>('/plants/preview', {
					params: { perPage: plantsPerPage, lastKey },
					signal: signal,
				});

				if (!controllers.isMounted) {
					return controllers.createCanceledData();
				}

				return controllers.createSuccessData(response.data);
			} catch (err: any) {
				if (controllers.isAborted || !controllers.isMounted) {
					return controllers.createCanceledData();
				}

				const error = err?.response?.data;
				return controllers.createErrorData(error);
			}
		},
		[controllers, plantsPerPage]
	);

	const listPlantsPreview = useCallback(
		async (lastKey?: string) => {
			setLoading(true);
			const requestData = await requestListPlantsPreview(lastKey);
			setLoading(false);
			return requestData;
		},
		[requestListPlantsPreview]
	);

	return [loading, listPlantsPreview] as [boolean, typeof listPlantsPreview];
};
