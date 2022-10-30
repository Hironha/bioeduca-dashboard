import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@services/api';
import { PlantQueryKeys } from './keys';

import { type IPlant } from '@interfaces/models/plant';

export type UpdatePlantPayload = Partial<
	Omit<IPlant, 'id' | 'created_at' | 'updated_at' | 'images'> & {
		delete_images?: string[];
		images?: File[];
	}
> & {
	id: string;
};

type UseUpdatePlantProps = Omit<
	UseMutationOptions<IPlant, unknown, UpdatePlantPayload, [PlantQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const formatUpdatePlantPayload = (values: UpdatePlantPayload) => {
	const payload = new FormData();

	const setPayloadIfDef = (key: string, value: string | undefined) => {
		if (value && value !== 'undefined') payload.set(key, value);
	};

	console.log({ deleteImages: values.delete_images });

	setPayloadIfDef('popular_name', values.popular_name);
	setPayloadIfDef('scientific_name', values.scientific_name);
	setPayloadIfDef('delete_images', JSON.stringify(values.delete_images));
	setPayloadIfDef('additional_informations', JSON.stringify(values.additional_informations));
	values.images?.forEach((imageFile) => {
		payload.append('images', imageFile);
	});
	return payload;
};

const updatePlant = async (payload: UpdatePlantPayload) => {
	const formattedPayload = formatUpdatePlantPayload(payload);
	const response = await api.put<IPlant>(`/plants/${payload.id}`, formattedPayload);
	return response.data;
};

export const useUpdatePlant = (props?: UseUpdatePlantProps) => {
	const queryClient = useQueryClient();
	const queryKey = [PlantQueryKeys.UPDATE] as [PlantQueryKeys];
	const onSuccess = props?.onSuccess;

	const handleSuccess = (
		data: IPlant,
		variables: UpdatePlantPayload,
		context: [PlantQueryKeys] | undefined
	): void => {
		if (onSuccess) onSuccess(data, variables, context);
		queryClient.invalidateQueries([PlantQueryKeys.CONSULT, data.id]);
		queryClient.removeQueries([PlantQueryKeys.LIST_PAGINATED_PREVIEW]);
	};

	return useMutation(queryKey, updatePlant, {
		...props,
		onSuccess: handleSuccess,
	});
};
