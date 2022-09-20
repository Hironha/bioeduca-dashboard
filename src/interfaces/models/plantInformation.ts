enum PlantInformationValidations {
	STRING = 'string',
}

export interface IPlantInformation {
	id: string;
	field_name: string;
	description: string;
	validation: `${PlantInformationValidations}` | PlantInformationValidations;
	created_at: number;
	updated_at: number;
}
