import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@services/api';
import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

export type CreatePlantInformationPayload = Pick<
	IPlantInformation,
	'field_name' | 'description' | 'order'
>;

type UseCreatePlantInformationProps = Omit<
	UseMutationOptions<
		IPlantInformation,
		unknown,
		CreatePlantInformationPayload,
		[PlantInformationQueryKeys]
	>,
	'mutationKey' | 'mutationFn'
>;

const createPlantInformation = async (payload: CreatePlantInformationPayload) => {
	const response = await api.post<IPlantInformation>('/plant-informations', payload);
	return response.data;
};

export const useCreatePlantInformation = (props?: UseCreatePlantInformationProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantInformationQueryKeys.CREATE] as [PlantInformationQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: IPlantInformation,
		variables: CreatePlantInformationPayload,
		context: [PlantInformationQueryKeys] | undefined
	): void => {
		const listKey: [PlantInformationQueryKeys] = [PlantInformationQueryKeys.LIST];
		const previousList = queryClient.getQueryData<IPlantInformation[]>(listKey);

		queryClient.setQueryData<IPlantInformation[]>(listKey, previousList?.concat(data));

		if (onSuccess) onSuccess(data, variables, context);
	};

	return useMutation(queryKey, createPlantInformation, {
		...props,
		onSuccess: handleSuccess,
	});
};
