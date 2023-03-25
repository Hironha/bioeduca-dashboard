import { Row, Col, notification } from 'antd';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '@components/Loading';
import { PlantInformationCard } from './components/PlantInformationCard';
import { DeletePlantInformationModal } from './components/DeletePlantInformationModal';
import { LoadingContainer } from './styles';

import { useListPlantInformations } from '@services/hooks/plantInformation/useListPlantInformations';
import { useDeletePlantInformation } from '@services/hooks/plantInformation/useDeletePlantInformation';
import { deletePlantInformationNotifications } from './utils/notifications/deletePlantInformation';
import { fetchPlantInformationsNotifications } from './utils/notifications/fetchPlantInformations';

import type { IPlantInformation } from '@interfaces/models/plantInformation';

type ListPlantInformationsProps = {
	className?: string;
};

export const ListPlantInformations = ({ className }: ListPlantInformationsProps) => {
	const navigate = useNavigate();
	const [plantInformationToDelete, setPlantInformationToDelete] =
		useState<IPlantInformation | null>(null);

	const listPlantInformationsResult = useListPlantInformations({
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 24 * 60 * 1000,
		onError() {
			notification.error(fetchPlantInformationsNotifications.error());
		},
	});

	const deletePlantInformation = useDeletePlantInformation({
		retry: false,
		onError() {
			notification.error(deletePlantInformationNotifications.error());
		},
		onSuccess() {
			setPlantInformationToDelete(null);
			notification.success(deletePlantInformationNotifications.success());
		},
	});

	const orderedPlantInformations = useMemo(() => {
		return listPlantInformationsResult.data?.sort((a, b) => (a.order >= b.order ? 0 : 1)) ?? [];
	}, [listPlantInformationsResult.data]);

	const handleDeletePlantInformation = async () => {
		if (!plantInformationToDelete) return;

		deletePlantInformation.mutate(plantInformationToDelete.id);
	};

	if (listPlantInformationsResult.isLoading || listPlantInformationsResult.isFetching) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row className={className} gutter={[24, 24]}>
			{orderedPlantInformations.map((plantInformation) => (
				<Col span={8} xs={24} sm={24} md={12} lg={8} key={plantInformation.id}>
					<PlantInformationCard
						plantInformation={plantInformation}
						onUpdate={() =>
							navigate(`/plant-informations/${plantInformation.id}`, { state: plantInformation })
						}
						onDelete={() => setPlantInformationToDelete(plantInformation)}
					/>
				</Col>
			))}

			<DeletePlantInformationModal
				centered
				destroyOnClose
				visible={plantInformationToDelete !== null}
				plantInformationName={
					plantInformationToDelete ? plantInformationToDelete.field_name : undefined
				}
				loading={deletePlantInformation.isLoading}
				onConfirmDelete={handleDeletePlantInformation}
				onCancel={() => setPlantInformationToDelete(null)}
			/>
		</Row>
	);
};
