export interface IPlantPreview {
	id: string;
	scientific_name: string;
	popular_name: string;
	images: string[];
}

export interface IPlant extends IPlantPreview {
	additional_informations: {
		[key: string]: string;
	}[];
}
