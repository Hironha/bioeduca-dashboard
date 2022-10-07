import { Row, Col, notification } from 'antd';
import { useEffect, useState } from 'react';

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
	const listPlantInformationsResult = useListPlantInformations({
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 24 * 60 * 1000,
	});
	const deletePlantInformation = useDeletePlantInformation({ retry: false });

	const [plantInformationToDelete, setPlantInformationToDelete] =
		useState<IPlantInformation | null>(null);

	const handleDeletePlantInformation = async () => {
		if (!plantInformationToDelete) return;
		deletePlantInformation.mutate(plantInformationToDelete.id);
	};

	useEffect(() => {
		if (listPlantInformationsResult.isError) {
			notification.error(fetchPlantInformationsNotifications.error());
		}
	}, [listPlantInformationsResult.isError]);

	useEffect(() => {
		if (deletePlantInformation.isError) {
			notification.error(deletePlantInformationNotifications.error());
		} else if (deletePlantInformation.isSuccess) {
			setPlantInformationToDelete(null);
			notification.success(deletePlantInformationNotifications.success());
		}
	}, [deletePlantInformation.isError, deletePlantInformation.isSuccess]);

	if (listPlantInformationsResult.isLoading || listPlantInformationsResult.isFetching) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row className={className} gutter={[24, 24]}>
			{listPlantInformationsResult.data?.map((plantInformation) => (
				<Col span={8} xs={24} sm={24} md={12} lg={8} key={plantInformation.id}>
					<PlantInformationCard
						fieldName={plantInformation.field_name}
						description={plantInformation.description}
						id={plantInformation.id}
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
