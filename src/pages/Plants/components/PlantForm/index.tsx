import { cloneElement, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, type ButtonProps, type FormInstance } from 'antd';

import { ImagesSelector } from './components/ImagesSelector';
import { AdditionalInformationsModal } from './components/AdditionalInformationsModal';
import { FormInputsSpacer, ActionsContainer, FormItem } from './styles';

import { useListPlantInformations } from '@services/hooks/plantInformation/useListPlantInformations';
import { plantFormRules } from './utils/validations';

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
	[PlantFormInputs.IMAGES]: (string | File)[];
	[PlantFormInputs.ADDITIONAL_INFORMATIONS]: IPlant['additional_informations'];
};

export type PlantFormProps = {
	className?: string;
	form: FormInstance<PlantFormValues>;
	initialValues?: Partial<PlantFormValues>;
	submitButton?: React.ReactElement<ButtonProps>;
	cancelButton?: React.ReactElement<ButtonProps>;
	onSubmit?: (values: PlantFormValues) => void | Promise<void>;
};

export const PlantForm = ({
	form,
	className,
	initialValues,
	onSubmit,
	submitButton = <Button>Cadastrar</Button>,
	cancelButton = <Button>Voltar</Button>,
}: PlantFormProps) => {
	const [selectedPlantInformations, setSelectedPlantInformations] = useState<IPlantInformation[]>(
		[]
	);
	const [plantInformationModalVisible, setPlantInformationModalVisible] = useState(false);
	const listPlantInformationsResult = useListPlantInformations({
		retry: false,
		refetchOnMount: true,
		staleTime: Infinity,
		cacheTime: 24 * 60 * 1000,
	});

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

	useEffect(() => {
		const plantInformations = listPlantInformationsResult.data;
		const additionalInformations = initialValues?.additionalInformations;

		if (additionalInformations && plantInformations) {
			const selectedPlantInformations = plantInformations.filter((plantInformation) => {
				const additionalInformationKey = plantInformation.field_name;
				return additionalInformations[additionalInformationKey] !== undefined;
			});

			setSelectedPlantInformations(selectedPlantInformations);
		}
	}, [listPlantInformationsResult.data, initialValues?.additionalInformations]);

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
				<Row gutter={24}>
					<Col sm={24} md={12}>
						<FormItem
							name={PlantFormInputs.POPULAR_NAME}
							label="Nome popular"
							rules={plantFormRules.popularName}
						>
							<Input placeholder="Ex: Araçazeiro" />
						</FormItem>
					</Col>

					<Col sm={24} md={12}>
						<FormItem
							name={PlantFormInputs.SCIENTIFIC_NAME}
							label="Nome científico"
							rules={plantFormRules.scientificName}
						>
							<Input placeholder="Ex: Psidium cattleianum" />
						</FormItem>
					</Col>

					{selectedPlantInformations.map((plantInformation, index) => {
						const totalSelectedPlantInformations = selectedPlantInformations.length;
						const isLastIndex = totalSelectedPlantInformations - 1 === index;
						const isIndexOdd = index % 2 === 0;
						return (
							<Col sm={24} md={isLastIndex && isIndexOdd ? 24 : 12} key={plantInformation.id}>
								<FormItem
									label={plantInformation.field_name}
									name={[PlantFormInputs.ADDITIONAL_INFORMATIONS, plantInformation.field_name]}
									rules={plantFormRules.additionalInformations}
								>
									<Input.TextArea autoSize={{ minRows: 1 }} />
								</FormItem>
							</Col>
						);
					})}
				</Row>

				<Form.Item>
					<Button
						type="primary"
						onClick={showPlantInformationsModal}
						disabled={listPlantInformationsResult.isLoading}
						loading={listPlantInformationsResult.isLoading}
					>
						Incluir informações adicionais
					</Button>
				</Form.Item>

				<FormItem name={PlantFormInputs.IMAGES} label="Imagens">
					<ImagesSelector />
				</FormItem>

				<Form.Item noStyle shouldUpdate>
					{({ getFieldsError }) => {
						const hasErrors = getFieldsError()?.some(({ errors }) => errors.length > 0);
						return (
							<Form.Item>
								<ActionsContainer>
									{cloneElement(cancelButton, { type: 'primary', ghost: true, danger: false })}
									{cloneElement(submitButton, {
										htmlType: 'submit',
										type: 'primary',
										...(hasErrors && { disabled: hasErrors }),
									})}
								</ActionsContainer>
							</Form.Item>
						);
					}}
				</Form.Item>
			</FormInputsSpacer>

			<AdditionalInformationsModal
				centered
				destroyOnClose
				initialSelected={selectedPlantInformations}
				visible={plantInformationModalVisible}
				plantInformations={listPlantInformationsResult.data ?? []}
				loading={listPlantInformationsResult.isLoading}
				onCancel={closePlantInformationModal}
				onAddInformations={handleAddPlantInformations}
			/>
		</Form>
	);
};
