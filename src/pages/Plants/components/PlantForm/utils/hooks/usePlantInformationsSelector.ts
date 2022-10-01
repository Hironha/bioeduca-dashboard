import { useState } from 'react';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

type PlantInformationSelector = {
	plantInformations: IPlantInformation[];
	selectedPlantInformations: IPlantInformation[];
	setPlantInformations: React.Dispatch<React.SetStateAction<IPlantInformation[]>>;
	setSelectedPlantInformations: React.Dispatch<React.SetStateAction<IPlantInformation[]>>;
};

export const usePlantInformationsSelector = (): PlantInformationSelector => {
	const [plantInformations, setPlantInformations] = useState<IPlantInformation[]>([]);
	const [selectedPlantInformations, setSelectedPlantInformations] = useState<IPlantInformation[]>(
		[]
	);

	return {
		plantInformations,
		selectedPlantInformations,
		setPlantInformations,
		setSelectedPlantInformations,
	};
};
