import { Row, Col, notification } from 'antd';
import { useEffect, useState } from 'react';

import { Loading } from '@components/Loading';
import { PlantInformationCard } from './components/PlantInformationCard';
import { DeletePlantInformationModal } from './components/DeletePlantInformationModal';
import { LoadingContainer } from './styles';

import { useFetchPlantInformations } from './utils/hooks/useFetchPlantInformations';
import { useDeletePlantInformation } from './utils/hooks/useDeletePlantInformation';
import { fetchPlantInformationsNotifications } from './utils/notifications/fetchPlantInformations';
import { deletePlantInformationNotifications } from './utils/notifications/deletePlantInformation';

import type { IPlantInformation } from '@interfaces/models/plantInformation';

type ListPlantInformationsProps = {
	className?: string;
};

export const ListPlantInformations = ({ className }: ListPlantInformationsProps) => {
	const [isFetching, fetchPlantInformations] = useFetchPlantInformations();
	const [isDeleting, deletePlantInformation] = useDeletePlantInformation();
	const [plantInformations, setPlantInformations] = useState<IPlantInformation[]>([]);
	const [plantInformationToDelete, setPlantInformationToDelete] =
		useState<IPlantInformation | null>(null);

	const handleDeleteError = () => {
		notification.error(deletePlantInformationNotifications.error());
	};

	const handleDeleteSuccess = (deletedPlantInformation: IPlantInformation) => {
		setPlantInformations((prevState) => {
			return prevState.filter((prev) => prev.id !== deletedPlantInformation.id);
		});
		setPlantInformationToDelete(null);
		notification.success(deletePlantInformationNotifications.success());
	};

	const selectPlantInformationToDelete = (plantInformation: IPlantInformation) => {
		setPlantInformationToDelete(plantInformation);
	};

	const handleCancelPlantInformationDelete = () => {
		setPlantInformationToDelete(null);
	};

	const handleDeletePlantInformation = async () => {
		if (!plantInformationToDelete) return;
		const plantInformation = plantInformationToDelete;
		const requestData = await deletePlantInformation(plantInformation.id);
		if (requestData.isCanceled) return;
		else if (requestData.isError) handleDeleteError();
		else handleDeleteSuccess(plantInformation);
	};

	useEffect(() => {
		const handleFetchError = () => {
			notification.error(fetchPlantInformationsNotifications.error());
		};

		const handleFetchSuccess = (plantInformations: IPlantInformation[]) => {
			setPlantInformations(plantInformations);
		};

		const _fetchPlantInformations = async () => {
			const requestData = await fetchPlantInformations();
			if (requestData.isCanceled) return;
			else if (requestData.isError) handleFetchError();
			else handleFetchSuccess(requestData.data);
		};

		_fetchPlantInformations();
	}, [fetchPlantInformations]);

	if (isFetching && plantInformations.length === 0) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row className={className} gutter={[24, 24]}>
			{plantInformations.map((plantInformation) => (
				<Col span={8} xs={24} sm={24} md={12} lg={8} key={plantInformation.id}>
					<PlantInformationCard
						fieldName={plantInformation.field_name}
						description={plantInformation.description}
						id={plantInformation.id}
						onDelete={() => selectPlantInformationToDelete(plantInformation)}
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
				loading={isDeleting}
				onConfirmDelete={handleDeletePlantInformation}
				onCancel={handleCancelPlantInformationDelete}
			/>
		</Row>
	);
};
