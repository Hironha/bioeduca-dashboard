import { Modal, Typography, Divider, type ModalProps } from 'antd';
import { ModalTitle } from './styles';

export type ViewPlantModalProps = Omit<ModalProps, 'footer' | 'children'> & {
	plantId?: string;
};

export const ViewPlantModal = ({ plantId, visible, ...props }: ViewPlantModalProps) => {
	const isVisible = visible && plantId != null;

	return (
		<Modal {...props} visible={isVisible} footer={null}>
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
				Distrito Federal (DF), Goiás (GO), Mato Grosso do Sul (MS), Mato Grosso (MT), Alagoas (AL),
				Bahia (BA), Ceará (CE), Maranhão (MA), Pará (PA), Pernambuco (PE), Piauí (PI), Rio Grande do
				Norte (RN), Sergipe (SE), Acre (AC), Pará (PA), Rondônia (RO), Tocantins (TO), Espírito
				Santo (ES), Minas Gerais (MG), Rio de Janeiro (RJ) e São Paulo (SP)
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
				Espécie muito utilizada na arborização urbana devido à beleza de suas flores. Sua madeira é
				utilizada para construção civil, postes e dormentes. Espécie indicada para a restauração de
				ecossistemas degradados
			</Typography>

			<Divider />
		</Modal>
	);
};
