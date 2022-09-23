import { useState, useEffect } from 'react';
import { Col, notification, Row } from 'antd';

import { Loading } from '@components/Loading';
import { PlantCard } from './components/PlantCard';
import { LoadingContainer } from './styles';

import {
	useListPlantsPreview,
	type ListPlantsPreviewResponse,
} from './utils/hooks/useListPlantsPreview';

export const ListPlants = () => {
	const [plantsPreviewData, setPlantsPreviewData] = useState<ListPlantsPreviewResponse>({
		data: [],
		hasMore: true,
	});
	const [loadingPlants, fetchPlantsPreview] = useListPlantsPreview();

	useEffect(() => {
		const handleFetchSuccess = (responseData: ListPlantsPreviewResponse) => {
			setPlantsPreviewData(responseData);
		};

		const handleFetchError = () => {
			notification.error({ message: 'Error' });
		};

		const _fetchPlantsPreview = async () => {
			const responseData = await fetchPlantsPreview(plantsPreviewData.lastKey);
			if (responseData.isCanceled) return;
			else if (responseData.isError) handleFetchError();
			else handleFetchSuccess(responseData.data);
		};

		if (plantsPreviewData.hasMore) {
			_fetchPlantsPreview();
		}
	}, [fetchPlantsPreview, plantsPreviewData.lastKey, plantsPreviewData.hasMore]);

	if (loadingPlants && plantsPreviewData.data.length === 0) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row gutter={[24, 16]}>
			{plantsPreviewData.data.map((plantPreview) => (
				<Col span={8} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={plantPreview.id}>
					<PlantCard
						popularName={plantPreview.popular_name}
						scientificName={plantPreview.scientific_name}
						imageURL={plantPreview.images[0] as string}
					/>
				</Col>
			))}
		</Row>
	);
};
