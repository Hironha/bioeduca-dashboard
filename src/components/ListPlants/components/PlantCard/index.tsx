import { Button } from 'antd';
import {
	CardHeaderContainer,
	CardContainer,
	CardImage,
	CardActionsContainer,
	CardSubtitle,
	CardTitle,
	CardImageContainer,
} from './styles';

type PlantCardProps = {
	scientificName: string;
	popularName: string;
	imageURL: string;
};

export const PlantCard = ({ imageURL, popularName, scientificName }: PlantCardProps) => {
	return (
		<CardContainer>
			<CardHeaderContainer>
				<CardTitle>{popularName}</CardTitle>
				<CardSubtitle>{scientificName}</CardSubtitle>
			</CardHeaderContainer>

			<CardImageContainer>
				<CardImage src={imageURL} />
			</CardImageContainer>

			<CardActionsContainer>
				<Button type="primary" ghost danger>
					Excluir
				</Button>
				<Button type="primary">Editar</Button>
			</CardActionsContainer>
		</CardContainer>
	);
};
