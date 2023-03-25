import { notification, Button, Form } from 'antd';

import { Content } from '@components/Content';
import { StyledPlantInformationForm } from './styles';

import { useCreatePlantInformation } from '@services/hooks/plantInformation/useCreatePlantInformation';
import { createPlantInformationNotifications as notifications } from './utils/notifications/createPlantInformations';

import { type PlantInformationValues } from '../../components/PlantInformationForm';

const parseOrder = (order: string): number => {
	const numericOrder = parseInt(order);
	return isNaN(numericOrder) ? 0 : numericOrder;
};

export const CreatePlantInformationPage = () => {
	const [form] = Form.useForm<PlantInformationValues>();
	const createPlantInformation = useCreatePlantInformation({
		retry: false,
		onError() {
			notification.error(notifications.error());
		},
		onSuccess() {
			notification.success(notifications.success());
			form.resetFields();
		},
	});

	const handleFormSubmit = (values: PlantInformationValues) => {
		createPlantInformation.mutate({
			description: values.description.trim(),
			field_name: values.fieldName.trim(),
			order: parseOrder(values.order),
		});
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
						<Button
							type="primary"
							disabled={createPlantInformation.isLoading}
							loading={createPlantInformation.isLoading}
						>
							Cadastrar
						</Button>
					}
				/>
			</Content.Body>
		</Content.Container>
	);
};
