import { cloneElement, useEffect, useState } from 'react';
import { Button, Form, Input, notification, type ButtonProps } from 'antd';

import { ImagesSelector } from './components/ImagesSelector';
import { AdditionalInformationsModal } from './components/AdditionalInformationsModal';
import { FormInputsSpacer, ActionsContainer } from './styles';

import { useFetchPlantInformations } from './hooks/useFetchPlantInformations';

import { type IPlant } from '@interfaces/models/plant';
import { type IPlantInformation } from '@interfaces/models/plantInformation';

enum PlantFormInputs {
	SCIENTIFIC_NAME = 'scientificName',
	POPULAR_NAME = 'popularName',
	IMAGES = 'images',
	ADDITIONAL_INFORMATIONS = 'additionalInformations',
}

export type PlantFormValues = {
	[PlantFormInputs.SCIENTIFIC_NAME]: string;
	[PlantFormInputs.POPULAR_NAME]: string;
	[PlantFormInputs.IMAGES]: File[];
	[PlantFormInputs.ADDITIONAL_INFORMATIONS]: IPlant['additional_informations'];
};

export type PlantFormProps = {
	className?: string;
	initialValues?: Partial<PlantFormValues>;
	submitButton?: React.ReactElement<ButtonProps>;
	onSubmit?: (values: PlantFormValues) => void | Promise<void>;
};

export const PlantForm = ({
	className,
	initialValues,
	onSubmit,
	submitButton = <Button>Cadastrar</Button>,
}: PlantFormProps) => {
	const [form] = Form.useForm<PlantFormValues>();
	const [plantInformations, setPlantInformations] = useState<IPlantInformation[]>([]);
	const [selectedPlantInformations, setSelectedPlantInformations] = useState<string[]>([]);
	const [fetchingPlantInformations, fetchPlantInformations] = useFetchPlantInformations();
	const [plantInformationModalVisible, setPlantInformationModalVisible] = useState(false);

	const handleAddPlantInformations = (selectedInformations: string[]) => {
		setSelectedPlantInformations(selectedInformations);
		setPlantInformationModalVisible(false);
	};

	const handleShowPlantInformationsModal = () => {
		setPlantInformationModalVisible(true);
	};

	const handleCancelPlantInformationsModal = () => {
		setPlantInformationModalVisible(false);
	};

	useEffect(() => {
		const handleFetchPlantInformationsError = () => {
			notification.error({ message: 'Erro' });
		};

		const handleFetchPlantInformationsSuccess = (plantInformations: IPlantInformation[]) => {
			setPlantInformations(plantInformations);
		};

		const _fetchPlantInformations = async () => {
			const responseValues = await fetchPlantInformations();
			if (responseValues.isCanceled) return;
			else if (responseValues.isError) handleFetchPlantInformationsError();
			else handleFetchPlantInformationsSuccess(responseValues.data);
		};

		_fetchPlantInformations();
	}, [fetchPlantInformations]);

	return (
		<Form
			layout="vertical"
			requiredMark={false}
			className={className}
			form={form}
			initialValues={initialValues}
			onFinish={onSubmit}
		>
			<FormInputsSpacer>
				<Form.Item name={PlantFormInputs.POPULAR_NAME} label="Nome popular">
					<Input placeholder="Ex: Araçazeiro" />
				</Form.Item>

				<Form.Item name={PlantFormInputs.SCIENTIFIC_NAME} label="Nome científico">
					<Input placeholder="Ex: Psidium cattleianum" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" onClick={handleShowPlantInformationsModal}>
						Incluir informações adicionais
					</Button>
				</Form.Item>

				<Form.Item name={PlantFormInputs.IMAGES} label="Imagens">
					<ImagesSelector />
				</Form.Item>

				<Form.Item>
					<ActionsContainer>
						<Button type="primary" ghost danger>
							Voltar
						</Button>
						{cloneElement(submitButton, { htmlType: 'submit', type: 'primary' })}
					</ActionsContainer>
				</Form.Item>
			</FormInputsSpacer>

			<AdditionalInformationsModal
				destroyOnClose
				centered
				visible={plantInformationModalVisible}
				plantInformations={plantInformations}
				loading={fetchingPlantInformations}
				onCancel={handleCancelPlantInformationsModal}
				onAddInformations={handleAddPlantInformations}
			/>
		</Form>
	);
};
