import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Content } from '@components/Content';
import { ListPlants } from '@components/ListPlants';
import { DeletePlantModal } from './components/DeletePlantModal';
import { RedirectLink } from './styles';

import { useDeletePlant } from '@services/hooks/plant/useDeletePlant';
import { deletePlantNotifications } from './utils/notifications/deletePlant';

import { type IPlantPreview } from '@interfaces/models/plant';

export const ListPlantsPage = () => {
	const navigate = useNavigate();
	const deletePlant = useDeletePlant({ retry: false });
	const [plantToDelete, setPlantToDelete] = useState<IPlantPreview | null>(null);

	const handleDeleteConfirm = () => {
		if (plantToDelete) {
			deletePlant.mutate(plantToDelete.id);
		}
	};

	useEffect(() => {
		if (deletePlant.isError) {
			notification.error(deletePlantNotifications.error());
		} else if (deletePlant.isSuccess) {
			setPlantToDelete(null);
			notification.success(deletePlantNotifications.success());
		}
	}, [deletePlant.isSuccess, deletePlant.isError]);

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
				<ListPlants
					perPage={12}
					onDelete={(plantPreview) => setPlantToDelete(plantPreview)}
					onUpdate={(plantpreview) => navigate(`/plants/${plantpreview.id}`)}
				/>
			</Content.Body>

			<DeletePlantModal
				centered
				destroyOnClose
				loading={deletePlant.isLoading}
				visible={plantToDelete !== null}
				plantPopularName={plantToDelete ? plantToDelete.popular_name : undefined}
				onConfirmDelete={handleDeleteConfirm}
				onCancel={() => setPlantToDelete(null)}
			/>
		</Content.Container>
	);
};
