import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@services/api';
import { PlantQueryKeys } from './keys';

import { type IPlant } from '@interfaces/models/plant';

export type CreatePlantPayload = Omit<IPlant, 'id' | 'created_at' | 'updated_at' | 'images'> & {
	images?: File[];
};

type UseCreatePlantProps = Omit<
	UseMutationOptions<IPlant, unknown, CreatePlantPayload, [PlantQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const formatCreatePlantPayload = (values: CreatePlantPayload) => {
	const payload = new FormData();
	payload.set('popular_name', values.popular_name);
	payload.set('scientific_name', values.scientific_name);
	payload.set('additional_informations', JSON.stringify(values.additional_informations));
	values.images?.forEach((imageFile) => {
		payload.append('images', imageFile);
	});
	return payload;
};

const createPlant = async (payload: CreatePlantPayload) => {
	const formattedPayload = formatCreatePlantPayload(payload);
	const response = await api.post<IPlant>('/plants', formattedPayload);
	return response.data;
};

export const useCreatePlant = (props?: UseCreatePlantProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantQueryKeys.CREATE] as [PlantQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: IPlant,
		variables: CreatePlantPayload,
		context: [PlantQueryKeys] | undefined
	): void => {
		if (onSuccess) onSuccess(data, variables, context);
		queryClient.invalidateQueries([PlantQueryKeys.LIST_PAGINATED_PREVIEW]);
	};

	return useMutation(queryKey, createPlant, {
		...props,
		onSuccess: handleSuccess,
	});
};
