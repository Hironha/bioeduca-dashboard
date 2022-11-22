import { cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space, type ButtonProps, type FormInstance } from 'antd';

import { SubmitSpace } from './styles';

import { plantInformationFormRules } from './utils/validations';

export type PlantInformationValues = {
	fieldName: string;
	description: string;
};

type PlantInformationFormProps = {
	className?: string;
	resetOnSubmit?: boolean;
	initialValues?: Partial<PlantInformationValues>;
	form: FormInstance<PlantInformationValues>;
	onSubmit?: (values: PlantInformationValues) => void | Promise<void>;
	submitButton?: React.ReactElement<ButtonProps>;
	disabledFields?: (keyof PlantInformationValues)[];
};

export const PlantInformationForm = ({
	className,
	form,
	initialValues,
	disabledFields = [],
	onSubmit,
	submitButton = <Button>Criar</Button>,
}: PlantInformationFormProps) => {
	const navigate = useNavigate();

	const handleBackClick = () => navigate(-1);

	return (
		<Form
			className={className}
			form={form}
			initialValues={initialValues}
			layout="vertical"
			requiredMark={false}
			onFinish={onSubmit}
		>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Form.Item
					name="fieldName"
					label="Nome da informação"
					rules={plantInformationFormRules.fieldName}
				>
					<Input placeholder="Ex: Bioma" disabled={disabledFields.includes('fieldName')} />
				</Form.Item>

				<Form.Item
					name="description"
					label="Descrição"
					rules={plantInformationFormRules.description}
				>
					<Input.TextArea
						autoSize={{ minRows: 3 }}
						disabled={disabledFields.includes('description')}
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
								<Button type="primary" ghost htmlType="button" onClick={handleBackClick}>
									Voltar
								</Button>

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
