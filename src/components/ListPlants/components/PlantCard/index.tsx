import { Button, Tooltip } from 'antd';
import { AiOutlineQrcode, AiOutlineSearch } from 'react-icons/ai';

import {
	CardHeaderContainer,
	CardContainer,
	CardImage,
	CardActionsContainer,
	CardSubtitle,
	CardTitle,
	CardImageContainer,
	MenuButton,
	MenuContainer,
} from './styles';

type PlantCardProps = {
	scientificName: string;
	popularName: string;
	imageURL: string;
	onDelete?: () => void;
	onUpdate?: () => void;
	onView: () => void;
	onQrCode: () => void;
};

export const PlantCard = ({
	imageURL,
	popularName,
	scientificName,
	onDelete,
	onUpdate,
	onView,
	onQrCode,
}: PlantCardProps) => {
	return (
		<CardContainer>
			<MenuContainer>
				<MenuButton type="primary" shape="circle" onClick={onQrCode}>
					<Tooltip title="Gerar QR code">
						<AiOutlineQrcode size={20} />
					</Tooltip>
				</MenuButton>
				<MenuButton type="primary" shape="circle" onClick={onView}>
					<Tooltip title="Visualizar planta">
						<AiOutlineSearch />
					</Tooltip>
				</MenuButton>
			</MenuContainer>

			<CardHeaderContainer>
				<CardTitle>{popularName}</CardTitle>
				<CardSubtitle>{scientificName}</CardSubtitle>
			</CardHeaderContainer>

			<CardImageContainer>
				<CardImage src={imageURL} />
			</CardImageContainer>

			<CardActionsContainer>
				{onDelete ? (
					<Button ghost danger type="primary" onClick={onDelete}>
						Excluir
					</Button>
				) : null}

				{onUpdate ? (
					<Button type="primary" onClick={onUpdate}>
						Editar
					</Button>
				) : null}
			</CardActionsContainer>
		</CardContainer>
	);
};
