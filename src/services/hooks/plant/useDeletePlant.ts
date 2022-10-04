import { api } from '@services/api';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { PlantQueryKeys } from './keys';

import { type IPlant } from '@interfaces/models/plant';

type UseDeletePlantProps = Omit<
	UseMutationOptions<{}, unknown, IPlant['id'], [PlantQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const deletePlant = async (id: IPlant['id']) => {
	const response = await api.delete<{}>(`/plants/${id}`);
	return response.data;
};

export const useDeletePlant = (props?: UseDeletePlantProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantQueryKeys.DELETE] as [PlantQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: {},
		variables: string,
		context: [PlantQueryKeys] | undefined
	): void => {
		if (onSuccess) onSuccess(data, variables, context);
		queryClient.invalidateQueries([PlantQueryKeys.LIST_PAGINATED_PREVIEW]);
	};

	return useMutation(queryKey, deletePlant, {
		...props,
		onSuccess: handleSuccess,
	});
};
