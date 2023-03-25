import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Content } from '@components/Content';
import { UpdatePlantInformation } from './components/UpdatePlantInformation';
import { FormContainer } from './styles';
import { type IPlantInformation } from '@interfaces/models/plantInformation';

export const UpdatePlantInformationPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const plantInformation = location.state as IPlantInformation | undefined;

	useEffect(() => {
		if (!plantInformation) {
			navigate(-1);
		}
	}, [plantInformation, navigate]);

	if (!plantInformation) {
		return null;
	}

	return (
		<Content.Container>
			<Content.Header>Edição de Informação da Planta</Content.Header>

			<Content.Body>
				<FormContainer>
					<UpdatePlantInformation plantInformation={plantInformation} />
				</FormContainer>
			</Content.Body>
		</Content.Container>
	);
};
