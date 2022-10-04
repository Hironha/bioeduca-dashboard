import { useEffect, useMemo } from 'react';
import { Col, notification, Row } from 'antd';

import { Observer } from '@components/Observer';
import { Loading } from '@components/Loading';
import { PlantCard } from './components/PlantCard';
import { LoadingContainer } from './styles';

import { listPlantsPreviewNotifications } from './utils/notifications/listPlantsPreview';
import { useListPaginatedPlantsPreview } from '@services/hooks/plant/useListPaginatedPlantsPreview';

import { type IPlantPreview } from '@interfaces/models/plant';

type ListPlantsProps = {
	limit?: number;
	perPage?: number;
	onDelete?: (plantPreview: IPlantPreview) => void;
};

export const ListPlants = ({ limit, perPage = 12, onDelete }: ListPlantsProps) => {
	const listPaginatedPlantsPreviewResult = useListPaginatedPlantsPreview({
		retry: false,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		cacheTime: 24 * 60 * 1000,
		meta: { perPage, limit },
	});

	const listPaginatedPlantsPreviewPages = useMemo(() => {
		return listPaginatedPlantsPreviewResult.data?.pages;
	}, [listPaginatedPlantsPreviewResult.data]);

	const plantsPreview = useMemo(() => {
		return listPaginatedPlantsPreviewPages?.map((response) => response.data).flat();
	}, [listPaginatedPlantsPreviewPages]);

	const handleDelete = (plantPrview: IPlantPreview) => {
		if (onDelete) {
			onDelete(plantPrview);
		}
	};

	const handleLastItemOnView: IntersectionObserverCallback = async (entries) => {
		const [entry] = entries;
		const isItemOnView = entry && entry.isIntersecting;
		if (isItemOnView) {
			listPaginatedPlantsPreviewResult.fetchNextPage();
		}
	};

	useEffect(() => {
		if (listPaginatedPlantsPreviewResult.error) {
			notification.error(listPlantsPreviewNotifications.error());
		}
	}, [listPaginatedPlantsPreviewResult.error]);

	if (listPaginatedPlantsPreviewResult.isLoading && !listPaginatedPlantsPreviewPages) {
		return (
			<LoadingContainer>
				<Loading size="medium" />
			</LoadingContainer>
		);
	}

	return (
		<Row gutter={[24, 16]}>
			{plantsPreview?.map((plantPreview, index) => {
				const isLastElement = index === plantsPreview.length - 1;
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
									onDelete={() => handleDelete(plantPreview)}
								/>
							</Observer>
						) : (
							<PlantCard
								popularName={plantPreview.popular_name}
								scientificName={plantPreview.scientific_name}
								imageURL={plantPreview.images[0] as string}
								onDelete={() => handleDelete(plantPreview)}
							/>
						)}
					</Col>
				);
			})}

			{listPaginatedPlantsPreviewResult.isFetching && (
				<Col span={24}>
					<LoadingContainer>
						<Loading size="medium" />
					</LoadingContainer>
				</Col>
			)}
		</Row>
	);
};
