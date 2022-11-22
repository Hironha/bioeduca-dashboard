import { api } from '@services/api';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

export type UpdatePlantInformationPayload = Pick<IPlantInformation, 'description' | 'id'>;

type UseUpdatePlantInformationProps = Omit<
	UseMutationOptions<
		IPlantInformation,
		unknown,
		UpdatePlantInformationPayload,
		[PlantInformationQueryKeys]
	>,
	'mutationKey' | 'mutationFn'
>;

const updatePlantInformation = async (payload: UpdatePlantInformationPayload) => {
	const response = await api.put<IPlantInformation>(`/plant-informations/${payload.id}`, {
		description: payload.description,
	});
	return response.data;
};

export const useUpdatePlantInformation = (props?: UseUpdatePlantInformationProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantInformationQueryKeys.UPDATE] as [PlantInformationQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: IPlantInformation,
		variables: UpdatePlantInformationPayload,
		context: [PlantInformationQueryKeys] | undefined
	): void => {
		queryClient.invalidateQueries([PlantInformationQueryKeys.LIST]);
		if (onSuccess) onSuccess(data, variables, context);
	};

	return useMutation(queryKey, updatePlantInformation, {
		...props,
		onSuccess: handleSuccess,
	});
};
