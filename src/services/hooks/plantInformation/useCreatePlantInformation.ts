import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@services/api';
import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

export type CreatePlantPayload = Pick<IPlantInformation, 'field_name' | 'description'>;

type UseCreatePlantInformationProps = Omit<
	UseMutationOptions<{}, unknown, CreatePlantPayload, [PlantInformationQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const createPlantInformation = async (payload: CreatePlantPayload) => {
	const response = await api.post<IPlantInformation>('/plant-informations', payload);
	return response.data;
};

export const useCreatePlantInformation = (props?: UseCreatePlantInformationProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantInformationQueryKeys.CREATE] as [PlantInformationQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: {},
		variables: CreatePlantPayload,
		context: [PlantInformationQueryKeys] | undefined
	): void => {
		queryClient.invalidateQueries([PlantInformationQueryKeys.LIST]);
		if (onSuccess) onSuccess(data, variables, context);
	};

	return useMutation(queryKey, createPlantInformation, {
		...props,
		onSuccess: handleSuccess,
	});
};
