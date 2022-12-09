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

			<Typography.Paragraph strong>Nome Popular</Typography.Paragraph>
			<Typography.Paragraph>Ipê-rosa</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Nome Científico</Typography.Paragraph>
			<Typography.Paragraph italic>Handroanthus impetiginosus</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Bioma</Typography.Paragraph>
			<Typography.Paragraph>
				Amazônia, Caatinga, Cerrado, Mata Atlântica e Pantanal
			</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Época de floração</Typography.Paragraph>
			<Typography.Paragraph>Julho a agosto</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Época de frutificação</Typography.Paragraph>
			<Typography.Paragraph>Setembro a outubro</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Família</Typography.Paragraph>
			<Typography.Paragraph>BIGNONIACEAE</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Filotaxia</Typography.Paragraph>
			<Typography.Paragraph>Oposta</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Grupo ecológico</Typography.Paragraph>
			<Typography.Paragraph>Secundária</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Ocorrência</Typography.Paragraph>
			<Typography.Paragraph>
				Distrito Federal (DF), Goiás (GO), Mato Grosso do Sul (MS), Mato Grosso (MT), Alagoas (AL),
				Bahia (BA), Ceará (CE), Maranhão (MA), Pará (PA), Pernambuco (PE), Piauí (PI), Rio Grande do
				Norte (RN), Sergipe (SE), Acre (AC), Pará (PA), Rondônia (RO), Tocantins (TO), Espírito
				Santo (ES), Minas Gerais (MG), Rio de Janeiro (RJ) e São Paulo (SP)
			</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Origem</Typography.Paragraph>
			<Typography.Paragraph>Nativa</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Síndrome de disperção</Typography.Paragraph>
			<Typography.Paragraph>Anemocoria</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Síndrome de polinização</Typography.Paragraph>
			<Typography.Paragraph>Monóica</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Tipo de folha</Typography.Paragraph>
			<Typography.Paragraph>Folha composta</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Tipo de fruto</Typography.Paragraph>
			<Typography.Paragraph>Síliqua</Typography.Paragraph>

			<Divider />

			<Typography.Paragraph strong>Utilizações</Typography.Paragraph>
			<Typography.Paragraph>
				Espécie muito utilizada na arborização urbana devido à beleza de suas flores. Sua madeira é
				utilizada para construção civil, postes e dormentes. Espécie indicada para a restauração de
				ecossistemas degradados
			</Typography.Paragraph>

			<Divider />
		</Modal>
	);
};
