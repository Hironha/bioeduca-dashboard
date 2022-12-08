import { useState } from 'react';
import { Button, Tooltip, Modal, Typography, Divider } from 'antd';
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
	ModalTitle,
} from './styles';

type PlantCardProps = {
	plantId: string;
	scientificName: string;
	popularName: string;
	imageURL: string;
	onDelete?: () => void;
	onUpdate?: () => void;
	onView: () => void;
};

export const PlantCard = ({
	imageURL,
	plantId,
	popularName,
	scientificName,
	onDelete,
	onUpdate,
	onView,
}: PlantCardProps) => {
	const [showQRCode, setShowQRCode] = useState<boolean>(false);
	const [showPlantData, setShowPlantData] = useState<boolean>(false);

	return (
		<CardContainer>
			<MenuContainer>
				<MenuButton type="primary" shape="circle" onClick={() => setShowQRCode(true)}>
					<Tooltip title="Gerar QR code">
						<AiOutlineQrcode size={20} />
					</Tooltip>
				</MenuButton>
				<MenuButton type="primary" shape="circle" onClick={() => setShowPlantData(true)}>
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
				<ModalTitle>QR Code para {popularName}</ModalTitle>

				<QRCodeContainer>
					<QRCode value={plantId} renderAs="canvas" />
				</QRCodeContainer>
			</Modal>

			<Modal
				centered
				destroyOnClose
				visible={showPlantData}
				onCancel={() => setShowPlantData(false)}
				footer={null}
			>
				<ModalTitle>Dados da planta</ModalTitle>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Nome Popular</Typography>
				<Typography>Ipê-rosa</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Nome Científico</Typography>
				<Typography style={{ fontStyle: 'italic' }}>Handroanthus impetiginosus</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Bioma</Typography>
				<Typography>Amazônia, Caatinga, Cerrado, Mata Atlântica e Pantanal</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Época de floração</Typography>
				<Typography>Julho a agosto</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Época de frutificação</Typography>
				<Typography>Setembro a outubro</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Família</Typography>
				<Typography>BIGNONIACEAE</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Filotaxia</Typography>
				<Typography>Oposta</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Grupo ecológico</Typography>
				<Typography>Secundária</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Ocorrência</Typography>
				<Typography>
					Distrito Federal (DF), Goiás (GO), Mato Grosso do Sul (MS), Mato Grosso (MT), Alagoas
					(AL), Bahia (BA), Ceará (CE), Maranhão (MA), Pará (PA), Pernambuco (PE), Piauí (PI), Rio
					Grande do Norte (RN), Sergipe (SE), Acre (AC), Pará (PA), Rondônia (RO), Tocantins (TO),
					Espírito Santo (ES), Minas Gerais (MG), Rio de Janeiro (RJ) e São Paulo (SP)
				</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Origem</Typography>
				<Typography>Nativa</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Síndrome de disperção</Typography>
				<Typography>Anemocoria</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Síndrome de polinização</Typography>
				<Typography>Monóica</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Tipo de folha</Typography>
				<Typography>Folha composta</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Tipo de fruto</Typography>
				<Typography>Síliqua</Typography>

				<Divider />

				<Typography style={{ fontWeight: 'bold' }}>Utilizações</Typography>
				<Typography>
					Espécie muito utilizada na arborização urbana devido à beleza de suas flores. Sua madeira
					é utilizada para construção civil, postes e dormentes. Espécie indicada para a restauração
					de ecossistemas degradados
				</Typography>

				<Divider />
			</Modal>
		</CardContainer>
	);
};
