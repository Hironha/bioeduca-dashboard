import { Row, Col, notification } from 'antd';
import { useEffect, useState } from 'react';

import { Loading } from '@components/Loading';
import { PlantInformationCard } from './components/PlantInformationCard';
import { LoadingContainer } from './styles';

import { useFetchPlantInformations } from './utils/hooks/useFetchPlantInformations';
import { fetchPlantInformationsNotifications as notifications } from './utils/notifications/fetchPlantInformations';

import type { IPlantInformation } from '@interfaces/models/plantInformation';

type ListPlantInformationsProps = {
	className?: string;
};

export const ListPlantInformations = ({ className }: ListPlantInformationsProps) => {
	const [plantInformations, setPlantInformations] = useState<IPlantInformation[]>([]);
	const [isFetching, fetchPlantInformations] = useFetchPlantInformations();

	useEffect(() => {
		const handleFetchError = () => {
			notification.error(notifications.error());
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
			{plantInformations.map((plantInformation, index) => (
				<Col span={8} xs={24} sm={24} md={12} lg={8} key={index}>
					<PlantInformationCard
						fieldName={plantInformation.field_name}
						description={plantInformation.description}
					/>
				</Col>
			))}
		</Row>
	);
};
