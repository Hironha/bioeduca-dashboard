import { cloneElement } from 'react';
import { Button, Form, Input, type ButtonProps } from 'antd';

import { ImagesSelector } from './components/ImagesSelector';
import { FormInputsSpacer, ActionsContainer } from './styles';

import { type IPlant } from '@interfaces/models/plant';

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

				<Form.Item name={PlantFormInputs.IMAGES} label="Imagens">
					<ImagesSelector />
				</Form.Item>

				<Form.Item>
					<ActionsContainer>
						{cloneElement(submitButton, { htmlType: 'submit', type: 'primary' })}
					</ActionsContainer>
				</Form.Item>
			</FormInputsSpacer>
		</Form>
	);
};
