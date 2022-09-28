import { useState, useEffect, useCallback } from 'react';
import { Col, notification, Row } from 'antd';

import { Observer } from '@components/Observer';
import { Loading } from '@components/Loading';
import { PlantCard } from './components/PlantCard';
import { LoadingContainer } from './styles';

import { listPlantsPreviewNotifications } from './utils/notifications/listPlantsPreview';

import {
	useListPlantsPreview,
	type ListPlantsPreviewResponse,
} from './utils/hooks/useListPlantsPreview';

type ListPlantsProps = {
	limit?: number;
	perPage?: number;
};

export const ListPlants = ({ limit, perPage = 12 }: ListPlantsProps) => {
	const [plantsPreviewData, setPlantsPreviewData] = useState<ListPlantsPreviewResponse>({
		data: [],
		hasMore: true,
	});
	const [loadingPlants, listPlantsPreview] = useListPlantsPreview({ plantsPerPage: perPage });

	const handleListPlantsSuccess = useCallback((responseData: ListPlantsPreviewResponse) => {
		setPlantsPreviewData((prevState) => ({
			...responseData,
			data: prevState.data.concat(responseData.data),
		}));
	}, []);

	const handleListPlantsError = useCallback(() => {
		notification.error(listPlantsPreviewNotifications.error());
	}, []);

	const fetchPlantsPreview = useCallback(
		async (lastKey?: string) => {
			const responseData = await listPlantsPreview(lastKey);
			if (responseData.isCanceled) return;
			else if (responseData.isError) handleListPlantsError();
			else handleListPlantsSuccess(responseData.data);
		},
		[listPlantsPreview, handleListPlantsError, handleListPlantsSuccess]
	);

	const handleInfinitePlantsFetch = () => {
		const plantsAmount = plantsPreviewData.data.length;
		const hasReachedLimit = limit ? limit <= plantsAmount : false;
		if (!hasReachedLimit && plantsPreviewData.hasMore) {
			fetchPlantsPreview(plantsPreviewData.lastKey);
		}
	};

	const handleLastItemOnView: IntersectionObserverCallback = async (entries) => {
		const [entry] = entries;
		const isItemOnView = entry && entry.isIntersecting;
		if (!isItemOnView) return;

		handleInfinitePlantsFetch();
	};

	useEffect(() => {
		fetchPlantsPreview();
	}, [fetchPlantsPreview]);

	if (loadingPlants && plantsPreviewData.data.length === 0) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row gutter={[24, 16]}>
			{plantsPreviewData.data.map((plantPreview, index) => {
				const isLastElement = index === plantsPreviewData.data.length - 1;
				return (
					<Col span={8} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={plantPreview.id}>
						{isLastElement ? (
							<Observer
								callback={handleLastItemOnView}
								options={{ root: null, rootMargin: '-10px', threshold: 1 }}
							>
								<PlantCard
									popularName={plantPreview.popular_name}
									scientificName={plantPreview.scientific_name}
									imageURL={plantPreview.images[0] as string}
								/>
							</Observer>
						) : (
							<PlantCard
								popularName={plantPreview.popular_name}
								scientificName={plantPreview.scientific_name}
								imageURL={plantPreview.images[0] as string}
							/>
						)}
					</Col>
				);
			})}

			{loadingPlants && (
				<Col span={24}>
					<LoadingContainer>
						<Loading size="medium" />
					</LoadingContainer>
				</Col>
			)}
		</Row>
	);
};
