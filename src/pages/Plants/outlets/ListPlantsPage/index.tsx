import { Content } from '@components/Content';

import { ListPlants } from '@components/ListPlants';

import { RedirectLink } from './styles';

export const ListPlantsPage = () => {
	return (
		<Content.Container>
			<Content.Header>Plantas</Content.Header>
			<Content.Description>
				Para {''}
				<RedirectLink to={'/plants/create'} style={{ textDecoration: 'underline' }}>
					criar uma planta
				</RedirectLink>
				, é necessário selecionar as informações que esta planta vai ter. Caso essa informação não
				exista, deve-se {''}
				<RedirectLink to={'/plant-informations/create'} style={{ textDecoration: 'underline' }}>
					criar uma nova informação
				</RedirectLink>
				, a qual poderá ser utilizada por todas as outras plantas. Além disso, é possível
				visualizar, editar e excluir as plantas já cadastradas.
			</Content.Description>
			<Content.Body>
				<ListPlants />
			</Content.Body>
		</Content.Container>
	);
};
