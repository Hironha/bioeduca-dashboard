import { api } from '@services/api';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { PlantInformationQueryKeys } from './keys';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

type UseDeletePlantInformationProps = Omit<
	UseMutationOptions<{}, unknown, IPlantInformation['id'], [PlantInformationQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const deletePlantInformation = async (id: IPlantInformation['id']) => {
	const response = await api.delete<{}>(`/plant-informations/${id}`);
	return response.data;
};

export const useDeletePlantInformation = (props?: UseDeletePlantInformationProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantInformationQueryKeys.DELETE] as [PlantInformationQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: {},
		id: IPlantInformation['id'],
		context: [PlantInformationQueryKeys] | undefined
	): void => {
		const listKey: [PlantInformationQueryKeys] = [PlantInformationQueryKeys.LIST];
		const previousList = queryClient.getQueryData<IPlantInformation[]>(listKey);

		queryClient.setQueryData<IPlantInformation[]>(
			[PlantInformationQueryKeys.LIST],
			previousList?.filter((plantInformation) => plantInformation.id !== id)
		);

		if (onSuccess) onSuccess(data, id, context);
	};

	return useMutation(queryKey, deletePlantInformation, {
		...props,
		onSuccess: handleSuccess,
	});
};
