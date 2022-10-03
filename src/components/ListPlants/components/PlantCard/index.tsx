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
	onDelete: () => void;
};

export const PlantCard = ({ imageURL, popularName, scientificName, onDelete }: PlantCardProps) => {
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
				<Button ghost danger type="primary" onClick={onDelete}>
					Excluir
				</Button>
				<Button type="primary">Editar</Button>
			</CardActionsContainer>
		</CardContainer>
	);
};
