import { api } from '@services/api';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

type UseDeletePlantInformationProps = Omit<
	UseMutationOptions<{}, unknown, IPlantInformation['id'], [PlantInformationQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const deletePlantInformation = async (id: IPlantInformation['id']) => {
	const response = await api.delete<{ }>(`/plant-informations/${id}`);
	return response.data;
};

export const useDeletePlantInformation = (props?: UseDeletePlantInformationProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantInformationQueryKeys.DELETE] as [PlantInformationQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: {},
		variables: string,
		context: [PlantInformationQueryKeys] | undefined
	): void => {
		queryClient.invalidateQueries([PlantInformationQueryKeys.LIST]);
		if (onSuccess) onSuccess(data, variables, context);
	};

	return useMutation(queryKey, deletePlantInformation, {
		...props,
		onSuccess: handleSuccess,
	});
};
