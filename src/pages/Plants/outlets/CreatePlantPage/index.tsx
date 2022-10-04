import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Button, Form } from 'antd';

import { Content } from '@components/Content';
import { PlantForm, type PlantFormValues } from '@pages/Plants/components/PlantForm';
import { FormContainer } from './styles';

import { useCreatePlant } from '@services/hooks/plant/useCreatePlant';

export const CreatePlantPage = () => {
	const [form] = Form.useForm<PlantFormValues>();
	const navigate = useNavigate();
	const createPlant = useCreatePlant({ retry: false });

	const handleCreatePlantSuccess = useCallback(() => {
		notification.success({
			message: 'Planta criada com sucesso',
			key: 'creation-success',
			duration: 3,
		});
		form.resetFields();
	}, [form]);

	const handleCreatePlantError = () => {
		notification.error({ message: 'Erro ao criar a planta' });
	};

	const handleFormSubmit = async (values: PlantFormValues) => {
		createPlant.mutate(
			{
				popular_name: values.popularName,
				scientific_name: values.scientificName,
				images: values.images,
				additional_informations: values.additionalInformations,
			},
			{
				onError: handleCreatePlantError,
				onSuccess: handleCreatePlantSuccess,
			}
		);
	};

	return (
		<Content.Container>
			<Content.Header>Criação de Planta</Content.Header>
			<Content.Body>
				<FormContainer>
					<PlantForm
						form={form}
						onSubmit={handleFormSubmit}
						cancelButton={<Button onClick={() => navigate(-1)}>Voltar</Button>}
						submitButton={
							<Button
								type="primary"
								disabled={createPlant.isLoading}
								loading={createPlant.isLoading}
							>
								Criar
							</Button>
						}
					/>
				</FormContainer>
			</Content.Body>
		</Content.Container>
	);
};
