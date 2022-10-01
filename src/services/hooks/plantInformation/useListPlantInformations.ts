import { api } from '@services/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

type UseListPlantInformationsProps = Omit<
	UseQueryOptions<IPlantInformation[], unknown, IPlantInformation[], [PlantInformationQueryKeys]>,
	'queryKey' | 'queryFn' | 'initialData'
> & {
	initialData?: () => undefined;
};

const listPlantInformations = async ({ signal }: { signal?: AbortSignal }) => {
	const response = await api.get<{ data: IPlantInformation[] }>('/plant-informations', { signal });
	return response.data.data;
};

export const useListPlantInformations = (props?: UseListPlantInformationsProps) => {
	const queryKey = [PlantInformationQueryKeys.LIST] as [PlantInformationQueryKeys];
	return useQuery(queryKey, listPlantInformations, props);
};
