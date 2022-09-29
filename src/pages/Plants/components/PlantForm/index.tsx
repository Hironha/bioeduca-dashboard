import { cloneElement, useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, type ButtonProps } from 'antd';

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
	const [fetchingPlantInformations, fetchPlantInformations] = useFetchPlantInformations();
	const [plantInformations, setPlantInformations] = useState<IPlantInformation[]>([]);
	const [selectedPlantInformations, setSelectedPlantInformations] = useState<IPlantInformation[]>(
		[]
	);
	const [plantInformationModalVisible, setPlantInformationModalVisible] = useState(false);

	const handleAddPlantInformations = (selectedInformations: IPlantInformation[]) => {
		setSelectedPlantInformations(selectedInformations);
		setPlantInformationModalVisible(false);
	};

	const showPlantInformationsModal = () => {
		setPlantInformationModalVisible(true);
	};

	const closePlantInformationModal = () => {
		setPlantInformationModalVisible(false);
	};

	const handleSubmit = (values: PlantFormValues) => {
		console.log(values);
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
			onFinish={handleSubmit}
		>
			<FormInputsSpacer>
				<Row gutter={24}>
					<Col sm={24} md={12}>
						<Form.Item name={PlantFormInputs.POPULAR_NAME} label="Nome popular">
							<Input placeholder="Ex: Araçazeiro" />
						</Form.Item>
					</Col>
					<Col sm={24} md={12}>
						<Form.Item name={PlantFormInputs.SCIENTIFIC_NAME} label="Nome científico">
							<Input placeholder="Ex: Psidium cattleianum" />
						</Form.Item>
					</Col>

					{selectedPlantInformations.map((plantInformation, index) => {
						const isLastIndex = selectedPlantInformations.length - 1 === index;
						const isIndexOdd = index % 2 === 0;
						return (
							<Col sm={24} md={isLastIndex && isIndexOdd ? 24 : 12} key={plantInformation.id}>
								<Form.Item
									label={plantInformation.field_name}
									name={[PlantFormInputs.ADDITIONAL_INFORMATIONS, plantInformation.field_name]}
								>
									<Input.TextArea autoSize={{ minRows: 1 }} />
								</Form.Item>
							</Col>
						);
					})}
				</Row>

				<Form.Item>
					<Button type="primary" onClick={showPlantInformationsModal}>
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
				centered
				destroyOnClose
				initialSelected={selectedPlantInformations}
				visible={plantInformationModalVisible}
				plantInformations={plantInformations}
				loading={fetchingPlantInformations}
				onCancel={closePlantInformationModal}
				onAddInformations={handleAddPlantInformations}
			/>
		</Form>
	);
};
