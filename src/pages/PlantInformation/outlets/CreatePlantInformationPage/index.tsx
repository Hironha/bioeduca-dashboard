import { notification, Button, Form } from 'antd';

import { Content } from '@components/Content';
import { type PlantInformationValues } from '../../components/PlantInformationForm';
import { StyledPlantInformationForm } from './styles';

import {
	useCreatePlantInformation,
	type CreatePlantInformationValues,
} from './utils/hooks/useCreatePlantInformation';
import { createPlantInformationNotifications as notifications } from './utils/notifications/createPlantInformations';

export const CreatePlantInformationPage = () => {
	const [form] = Form.useForm<PlantInformationValues>();
	const [isFormSubmitting, createPlantInformation] = useCreatePlantInformation();

	const handleSubmitError = () => {
		notification.error(notifications.error());
	};

	const handleSubmitSuccess = () => {
		notification.success(notifications.success());
		form.resetFields();
	};

	const handleFormSubmit = async (values: PlantInformationValues) => {
		const payload: CreatePlantInformationValues = {
			description: values.description.trim(),
			field_name: values.fieldName.trim(),
		};
		const requestData = await createPlantInformation(payload);
		if (requestData.isCanceled) return;
		else if (requestData.isError) handleSubmitError();
		else handleSubmitSuccess();
	};

	return (
		<Content.Container>
			<Content.Header>Cadastrar Informação das Plantas</Content.Header>
			<Content.Description>
				Ao criar uma informação de planta, esta estará disponível na criação e edição de uma planta
				em forma de campo de entrada de dados. Por exemplo, ao cadastrar a informação{' '}
				<strong>Bioma</strong>, as plantas terão o respectivo campo e cada planta pode possuir um
				valor diferente, isto é, caso cadastre a planta <strong>Araçazeiro</strong>, esta poderá ter
				o campo <strong>Bioma</strong> preenchido com o valor <strong>Cerrado</strong>.
			</Content.Description>
			<Content.Body>
				<Content.Header level={5}>Formulário para cadastro</Content.Header>
				<StyledPlantInformationForm
					form={form}
					onSubmit={handleFormSubmit}
					submitButton={
						<Button type="primary" disabled={isFormSubmitting} loading={isFormSubmitting}>
							Cadastrar
						</Button>
					}
				/>
			</Content.Body>
		</Content.Container>
	);
};
