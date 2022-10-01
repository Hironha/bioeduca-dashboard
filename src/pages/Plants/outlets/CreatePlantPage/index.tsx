import { useNavigate } from 'react-router-dom';
import { notification, Button, Form } from 'antd';

import { Content } from '@components/Content';
import { PlantForm, type PlantFormValues } from '@pages/Plants/components/PlantForm';

import { useCreatePlant } from './utils/hooks/useCreatePlant';

export const CreatePlantPage = () => {
	const [form] = Form.useForm<PlantFormValues>();
	const navigate = useNavigate();
	const [creatingPlant, createPlant] = useCreatePlant();

	const formatCreatePlantPayload = (values: PlantFormValues) => {
		const payload = new FormData();
		payload.set('popular_name', values.popularName);
		payload.set('scientific_name', values.scientificName);
		payload.set('additional_informations', JSON.stringify(values.additionalInformations));
		values.images?.forEach((imageFile) => {
			payload.append('images', imageFile);
		});
		return payload;
	};

	const handleCreatePlantSuccess = () => {
		notification.success({
			message: 'Planta criada com sucesso',
			key: 'creation-success',
			duration: 3,
		});
		form.resetFields();
	};

	const handleCreatePlantError = () => {
		notification.error({ message: 'Erro ao criar a planta' });
	};

	const handleFormSubmit = async (values: PlantFormValues) => {
		const createPlantPayload = formatCreatePlantPayload(values);
		const responseValues = await createPlant(createPlantPayload);
		if (responseValues.isCanceled) return;
		else if (responseValues.isError) handleCreatePlantError();
		else handleCreatePlantSuccess();
	};

	return (
		<Content.Container>
			<Content.Header>Criação de Planta</Content.Header>
			<Content.Body>
				<PlantForm
					form={form}
					onSubmit={handleFormSubmit}
					cancelButton={<Button onClick={() => navigate(-1)}>Voltar</Button>}
					submitButton={
						<Button type="primary" disabled={creatingPlant} loading={creatingPlant}>
							Criar
						</Button>
					}
				/>
			</Content.Body>
		</Content.Container>
	);
};
