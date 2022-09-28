import { useState, useEffect } from 'react';
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
	const [lastKeySearched, setLastKeySearched] = useState<string>();
	const [plantsPreviewData, setPlantsPreviewData] = useState<ListPlantsPreviewResponse>({
		data: [],
		hasMore: true,
	});
	const [loadingPlants, fetchPlantsPreview] = useListPlantsPreview({ plantsPerPage: perPage });

	const handleLastItemOnView: IntersectionObserverCallback = (entries) => {
		const [entry] = entries;
		if (!entry || !entry.isIntersecting) return;
		setLastKeySearched(plantsPreviewData.lastKey);
	};

	useEffect(() => {
		const handleFetchSuccess = (responseData: ListPlantsPreviewResponse) => {
			setPlantsPreviewData((prevState) => ({
				...responseData,
				data: prevState.data.concat(responseData.data),
			}));
		};

		const handleFetchError = () => {
			notification.error(listPlantsPreviewNotifications.error());
		};

		const _fetchPlantsPreview = async () => {
			const responseData = await fetchPlantsPreview(lastKeySearched);
			if (responseData.isCanceled) return;
			else if (responseData.isError) handleFetchError();
			else handleFetchSuccess(responseData.data);
		};

		if (limit) {
			if (plantsPreviewData.hasMore && plantsPreviewData.data.length < limit) {
				_fetchPlantsPreview();
			}
		} else if (plantsPreviewData.hasMore) {
			_fetchPlantsPreview();
		}
	}, [fetchPlantsPreview, lastKeySearched, plantsPreviewData.hasMore, limit]);

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
