import { Content } from '@components/Content';
import { ListPlantInformations } from '../ListPlantInformations';
import { DeletePlantInformationAlert } from './styles';

export const ListPlantInformationsPage = () => {
	return (
		<Content.Container>
			<Content.Header level={3}>Informações das Plantas</Content.Header>
			<Content.Description>
				Informações das plantas são todas as informações que uma planta pode possuir. Elas são
				gerenciadas pelo usuário, onde o mesmo pode cadastrar, editar ou excuir uma informação. Ao
				cadastrar uma nova informação, as plantas poderão ter essa informação vinculada a elas, por
				exemplo, caso cadastre a informação <strong>Bioma</strong>, as plantas poderão ter o campo{' '}
				<strong>Bioma</strong> com valores distintos para cada uma.
			</Content.Description>
			<DeletePlantInformationAlert
				showIcon
				type="info"
				description="A exclusão de uma informação das plantas acarretará na exclusão dessas informações nas plantas. Por exemplo, ao excluir o campo Bioma, o mesmo será removido de todas as plantas que possuem esse campo."
			/>
			<Content.Body>
				<ListPlantInformations />
			</Content.Body>
		</Content.Container>
	);
};
