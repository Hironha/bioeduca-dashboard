import { type PlantFormValues } from '../../';
import { type Rule } from 'antd/lib/form';

const popularNameRules: Rule[] = [{ required: true, message: 'Insira o nome popular' }];

const scientificNameRules: Rule[] = [{ required: true, message: 'Insira o nome científico' }];

const additionalInformationFieldRules: Rule[] = [{ required: true, message: 'Insira o {label}' }];

export const plantFormRules: { [key in keyof PlantFormValues]?: Rule[] } = {
	popularName: popularNameRules,
	scientificName: scientificNameRules,
	additionalInformations: additionalInformationFieldRules,
};
