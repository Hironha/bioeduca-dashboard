import { Rule } from 'antd/lib/form';
import { PlantInformationInputs } from '../..';

const fieldNameRules: Rule[] = [
	{ required: true, message: 'Informe um nome para a informação da planta.' },
];

const descriptionRules: Rule[] = [{ required: true, message: 'Informe uma descrição.' }];

const validationRules: Rule[] = [{ required: true, message: 'Informe o tipo da informação.' }];

export const plantInformationFormRules: { [key in PlantInformationInputs]?: Rule[] } = {
	fieldName: fieldNameRules,
	description: descriptionRules,
	validation: validationRules,
};
