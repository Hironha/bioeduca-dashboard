import { useNavigate, useParams } from 'react-router-dom';

import { Content } from '@components/Content';
import { UpdatePlant } from './components/UpdatePlant';
import { FormContainer } from './styles';

export const UpdatePlantPage = () => {
	const navigate = useNavigate();
	const { plantId } = useParams();

	if (!plantId) {
		navigate(-1);
		return null;
	}

	return (
		<Content.Container>
			<Content.Header>Edição de Planta</Content.Header>
			<Content.Body>
				<FormContainer>
					<UpdatePlant plantId={plantId} />
				</FormContainer>
			</Content.Body>
		</Content.Container>
	);
};
