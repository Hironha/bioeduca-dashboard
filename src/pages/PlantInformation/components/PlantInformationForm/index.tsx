import { cloneElement } from 'react';
import { Button, Form, Input, Select, Space, type ButtonProps, type FormInstance } from 'antd';

import { SubmitSpace } from './styles';

import { plantInformationFormRules } from './utils/validations';

import { type DefaultOptionType } from 'antd/lib/select';

export enum PlantInformationInputs {
	FIELD_NAME = 'fieldName',
	DESCRIPTION = 'description',
}

export type PlantInformationValues = {
	[PlantInformationInputs.FIELD_NAME]: string;
	[PlantInformationInputs.DESCRIPTION]: string;
};

type PlantInformationFormProps = {
	form: FormInstance<PlantInformationValues>;
	resetOnSubmit?: boolean;
	onSubmit?: (values: PlantInformationValues) => void | Promise<void>;
	submitButton?: React.ReactElement<ButtonProps>;
};

export const PlantInformationForm = ({
	form,
	onSubmit,
	submitButton = <Button>Criar</Button>,
}: PlantInformationFormProps) => {
	return (
		<Form form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Form.Item
					name={PlantInformationInputs.FIELD_NAME}
					label="Nome da informação"
					rules={plantInformationFormRules.fieldName}
				>
					<Input placeholder="Ex: Bioma" />
				</Form.Item>

				<Form.Item
					name={PlantInformationInputs.DESCRIPTION}
					label="Descrição"
					rules={plantInformationFormRules.description}
				>
					<Input.TextArea
						autoSize={{ minRows: 3 }}
						placeholder="Ex: Bioma é um conjunto de vida vegetal e animal, constituído pelo agrupamento de tipos de vegetação que são próximos"
					/>
				</Form.Item>

				<Form.Item noStyle shouldUpdate>
					{({ getFieldsError, getFieldsValue }) => {
						const disabled = (() => {
							const hasErrors = getFieldsError()?.some(({ errors }) => errors.length > 0);
							const isFieldsFilled = Object.values(getFieldsValue()).every(
								(value) => value !== undefined && value !== null
							);
							return hasErrors || !isFieldsFilled;
						})();
						return (
							<SubmitSpace>
								{cloneElement(submitButton, {
									type: 'primary',
									htmlType: 'submit',
									...(disabled && { disabled }),
								})}
							</SubmitSpace>
						);
					}}
				</Form.Item>
			</Space>
		</Form>
	);
};
