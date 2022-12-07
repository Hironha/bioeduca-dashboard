import { useNavigate, useParams } from 'react-router-dom';

import { Content } from '@components/Content';
import { ViewPlant } from './components/ViewPlant';

export const ViewPlantPage = () => {
	const navigate = useNavigate();
	const { plantId } = useParams();

	if (!plantId) {
		navigate('/plants');
		return null;
	}

	return (
		<Content.Container>
			<Content.Header>Edição de Planta</Content.Header>
			<Content.Body>
				<ViewPlant plantId={plantId} />
			</Content.Body>
		</Content.Container>
	);
};
