import { Content } from '@components/Content';
import { ListPlantInformations } from '../ListPlantInformations';
import { DeletePlantInformationAlert, CreatePlantInformationLink } from './styles';

export const ListPlantInformationsPage = () => {
	return (
		<Content.Container>
			<Content.Header>Informações das Plantas</Content.Header>
			<Content.Description>
				Informações das plantas são todas as informações que uma planta pode possuir. Elas são
				gerenciadas pelo usuário, onde o mesmo pode{' '}
				<CreatePlantInformationLink to={'/plant-informations/create'}>
					<span>cadastrar</span>
				</CreatePlantInformationLink>
				, editar ou excuir uma informação. Ao cadastrar uma nova informação, as plantas poderão ter
				essa informação vinculada a elas, por exemplo, caso cadastre a informação{' '}
				<strong>Bioma</strong>, as plantas poderão ter o campo <strong>Bioma</strong> com valores
				distintos para cada uma.
			</Content.Description>
			<DeletePlantInformationAlert
				showIcon
				type="info"
				description="Excluir uma informação das plantas faz com que ela seja apagada de todas as plantas cadastradas. Por exemplo, ao excluir o campo Bioma, o mesmo será removido de todas as plantas que possuem esse campo."
			/>
			<Content.Body>
				<ListPlantInformations />
			</Content.Body>
		</Content.Container>
	);
};
