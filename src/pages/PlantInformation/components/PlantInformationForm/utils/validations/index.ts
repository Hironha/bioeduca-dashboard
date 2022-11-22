import { Rule } from 'antd/lib/form';
import { type PlantInformationValues } from '../..';

const fieldNameRules: Rule[] = [
	{ required: true, message: 'Informe um nome para a informação da planta.' },
];

const descriptionRules: Rule[] = [{ required: true, message: 'Informe uma descrição.' }];

export const plantInformationFormRules: { [key in keyof PlantInformationValues]?: Rule[] } = {
	fieldName: fieldNameRules,
	description: descriptionRules,
};
