import { Content } from '@components/Content';

import { PlantForm, type PlantFormValues } from '@pages/Plants/components/PlantForm';

export const CreatePlantPage = () => {
	const handleFormSubmit = (values: PlantFormValues) => {
		console.log(values);
	};

	return (
		<Content.Container>
			<Content.Header>Criação de Planta</Content.Header>
			<Content.Body>
				<PlantForm onSubmit={handleFormSubmit} />
			</Content.Body>
		</Content.Container>
	);
};
