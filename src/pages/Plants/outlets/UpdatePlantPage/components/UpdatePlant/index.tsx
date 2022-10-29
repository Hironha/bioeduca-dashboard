import { useMemo } from 'react';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Loading } from '@components/Loading';
import { PlantForm, PlantFormValues } from '@pages/Plants/components/PlantForm';
import { LoadingContainer } from './styles';

import { useConsultPlant } from '@services/hooks/plant/useConsultPlant';

type UpdatePlantProps = {
	plantId: string;
};

export const UpdatePlant = ({ plantId }: UpdatePlantProps) => {
	const [form] = Form.useForm<PlantFormValues>();
	const navigate = useNavigate();
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
			cancelButton={
				<Button type="primary" ghost danger onClick={() => navigate(-1)}>
					Voltar
				</Button>
			}
			submitButton={<Button type="primary">Salvar alterações</Button>}
		/>
	);
};
