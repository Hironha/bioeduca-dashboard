import { useEffect } from 'react';
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

export const UpdatePlantInformation = ({ plantInformation }: UpdatePlantInformationProps) => {
	const [form] = Form.useForm<PlantInformationValues>();
	const updatePlantInformation = useUpdatePlantInformation({ cacheTime: 0, retry: false });

	const initialValues: PlantInformationValues = {
		description: plantInformation.description,
		fieldName: plantInformation.field_name,
	};

	const handleFormSubmit = (values: PlantInformationValues) => {
		updatePlantInformation.mutate({ id: plantInformation.id, description: values.description });
	};

	useEffect(() => {
		if (updatePlantInformation.error) {
			notification.error({
				message: 'Aconteceu um erro ao atualizar os dados de informação da planta',
			});
		} else if (updatePlantInformation.isSuccess) {
			notification.success({ message: 'Informação da planta atualizada com succeso' });
		}
	}, [updatePlantInformation.error, updatePlantInformation.isSuccess]);

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
