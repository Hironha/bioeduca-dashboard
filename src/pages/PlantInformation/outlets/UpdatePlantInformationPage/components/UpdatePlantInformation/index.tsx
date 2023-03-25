import { Form, Button, notification } from 'antd';
import {
	PlantInformationForm,
	type PlantInformationValues,
} from '../../../../components/PlantInformationForm';

import { useUpdatePlantInformation } from '@services/hooks/plantInformation/useUpdatePlantInformation';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

type UpdatePlantInformationProps = {
	plantInformation: IPlantInformation;
};

const parseOrder = (order: string): number => {
	const numericOrder = parseInt(order);
	return isNaN(numericOrder) ? 0 : numericOrder;
};

export const UpdatePlantInformation = ({ plantInformation }: UpdatePlantInformationProps) => {
	const [form] = Form.useForm<PlantInformationValues>();

	const updatePlantInformation = useUpdatePlantInformation({
		cacheTime: 0,
		retry: false,
		onError() {
			notification.error({
				message: 'Aconteceu um erro ao atualizar os dados de informação da planta',
			});
		},
		onSuccess() {
			notification.success({ message: 'Informação da planta atualizada com succeso' });
		},
	});

	const initialValues: PlantInformationValues = {
		description: plantInformation.description,
		fieldName: plantInformation.field_name,
		order: plantInformation.order.toString(),
	};

	const handleFormSubmit = ({ order, description }: PlantInformationValues) => {
		updatePlantInformation.mutate({
			id: plantInformation.id,
			description: description.trim(),
			order: parseOrder(order),
		});
	};

	return (
		<PlantInformationForm
			form={form}
			onSubmit={handleFormSubmit}
			initialValues={initialValues}
			disabledFields={['fieldName']}
			submitButton={
				<Button
					type="primary"
					loading={updatePlantInformation.isLoading}
					disabled={updatePlantInformation.isLoading}
				>
					Salvar alterações
				</Button>
			}
		/>
	);
};
