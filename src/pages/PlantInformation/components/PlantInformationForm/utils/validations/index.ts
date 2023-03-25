import { Rule } from 'antd/lib/form';
import { type PlantInformationValues } from '../..';

const fieldNameRules: Rule[] = [
	{ required: true, message: 'Informe um nome para a informação da planta.' },
];

const descriptionRules: Rule[] = [{ required: true, message: 'Informe uma descrição.' }];

const orderRules: Rule[] = [{ required: true, message: 'Informe a ordem de aparição do item.' }];

export const formRules: { [key in keyof PlantInformationValues]?: Rule[] } = {
	fieldName: fieldNameRules,
	description: descriptionRules,
	order: orderRules,
};
