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
	onDelete?: () => void;
	onUpdate?: () => void;
};

export const PlantCard = ({
	imageURL,
	popularName,
	scientificName,
	onDelete,
	onUpdate,
}: PlantCardProps) => {
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
				{onDelete !== undefined && (
					<Button ghost danger type="primary" onClick={onDelete}>
						Excluir
					</Button>
				)}

				{onUpdate !== undefined && (
					<Button type="primary" onClick={onUpdate}>
						Editar
					</Button>
				)}
			</CardActionsContainer>
		</CardContainer>
	);
};
