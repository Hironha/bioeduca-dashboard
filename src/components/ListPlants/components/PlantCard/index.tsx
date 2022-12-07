import { useState } from 'react';
import { Button, Tooltip, Modal } from 'antd';
import { AiOutlineQrcode, AiOutlineSearch } from 'react-icons/ai';
import QRCode from 'qrcode.react';

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
	QRCodeContainer,
	QRCodeModalTitle,
} from './styles';

type PlantCardProps = {
	plantId: string;
	scientificName: string;
	popularName: string;
	imageURL: string;
	onDelete?: () => void;
	onUpdate?: () => void;
	onView: () =>void
};

export const PlantCard = ({
	imageURL,
	plantId,
	popularName,
	scientificName,
	onDelete,
	onUpdate,
	onView
}: PlantCardProps) => {
	const [showQRCode, setShowQRCode] = useState<boolean>(false);

	return (
		<CardContainer>
			<MenuContainer>
				<MenuButton type="primary" shape="circle" onClick={() => setShowQRCode(true)}>
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

			<Modal
				centered
				destroyOnClose
				visible={showQRCode}
				onCancel={() => setShowQRCode(false)}
				footer={null}
			>
				<QRCodeModalTitle>QRCode para {popularName}</QRCodeModalTitle>

				<QRCodeContainer>
					<QRCode value={plantId} renderAs="canvas" />
				</QRCodeContainer>
			</Modal>
		</CardContainer>
	);
};
