import { useMemo } from 'react';
import { Button, Form, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Loading } from '@components/Loading';
import { PlantForm, PlantFormValues } from '@pages/Plants/components/PlantForm';
import { LoadingContainer } from './styles';

import { useUpdatePlant } from '@services/hooks/plant/useUpdatePlant';
import { useConsultPlant } from '@services/hooks/plant/useConsultPlant';

type UpdatePlantProps = {
	plantId: string;
};

export const UpdatePlant = ({ plantId }: UpdatePlantProps) => {
	const [form] = Form.useForm<PlantFormValues>();
	const navigate = useNavigate();
	const updatePlant = useUpdatePlant({ cacheTime: 0, retry: false });
	const consultPlantResult = useConsultPlant({
		plantId,
		options: {
			retry: false,
			refetchOnMount: true,
			cacheTime: 24 * 60 * 1000,
			staleTime: Infinity,
		},
	});

	const plantFormInitialValues: PlantFormValues | undefined = useMemo(() => {
		if (!consultPlantResult.data) return undefined;
		return {
			additionalInformations: consultPlantResult.data.additional_informations,
			popularName: consultPlantResult.data.popular_name,
			scientificName: consultPlantResult.data.scientific_name,
			images: consultPlantResult.data.images,
		} as PlantFormValues;
	}, [consultPlantResult.data]);

	const handleUpdateSuccess = () => {
		notification.success({
			key: 'update-plant-success',
			message: `Planta atualizada com sucesso`,
			duration: 3,
		});
	};

	const handleUpdateError = () => {
		notification.error({
			key: 'update-plant-error',
			message: 'Aconteceu um erro ao atualizar dados da planta',
			duration: 5,
		});
	};

	const getDeleteImages = (images: PlantFormValues['images']) => {
		const initialImagesSRC = consultPlantResult.data?.images ?? [];
		const deletedImagesSRC = initialImagesSRC.filter((src) => !images.includes(src));
		const deletedImagesName = deletedImagesSRC.map((src) => src.split('/').slice(-1).join());
		return deletedImagesName;
	};

	const handleFormSubmit = async (values: PlantFormValues) => {
		if (!consultPlantResult.data?.id) return;
		updatePlant.mutate(
			{
				id: consultPlantResult.data.id,
				popular_name: values.popularName,
				scientific_name: values.scientificName,
				images: values.images.filter((img) => typeof img !== 'string') as File[],
				delete_images: getDeleteImages(values.images),
				additional_informations: values.additionalInformations,
			},
			{ onSuccess: handleUpdateSuccess, onError: handleUpdateError }
		);
	};

	if (consultPlantResult.isLoading) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<PlantForm
			form={form}
			initialValues={plantFormInitialValues}
			onSubmit={handleFormSubmit}
			cancelButton={
				<Button type="primary" ghost danger onClick={() => navigate(-1)}>
					Voltar
				</Button>
			}
			submitButton={
				<Button type="primary" loading={updatePlant.isLoading} disabled={updatePlant.isLoading}>
					Salvar alterações
				</Button>
			}
		/>
	);
};
