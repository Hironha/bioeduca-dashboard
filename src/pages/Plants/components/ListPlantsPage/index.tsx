import { Content } from '@components/Content';

import { ListPlants } from '../ListPlants';

export const ListPlantsPage = () => {
	return (
		<Content.Container>
			<Content.Header>Listagem de Plantas</Content.Header>
			<Content.Body>
				<ListPlants />
			</Content.Body>
		</Content.Container>
	);
};
