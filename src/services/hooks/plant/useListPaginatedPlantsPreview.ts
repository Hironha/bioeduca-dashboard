import {
	useInfiniteQuery,
	type InfiniteData,
	type UseInfiniteQueryOptions,
	type QueryFunctionContext,
} from '@tanstack/react-query';

import { api } from '@services/api';
import { PlantQueryKeys } from './keys';

import { type IPlantPreview } from '@interfaces/models/plant';

type ListPaginatedPlantsPreviewResponse = {
	hasMore: boolean;
	lastKey?: string;
	data: IPlantPreview[];
};

type ListPaginatedPlantsPreviewParams = {
	lastKey?: string;
	perPage: number;
};

type ListPaginatedPlantsPreviewProps = QueryFunctionContext<
	[PlantQueryKeys],
	ListPaginatedPlantsPreviewParams
>;

type UseListPaginatedPlantsPreviewProps = Omit<
	UseInfiniteQueryOptions<
		ListPaginatedPlantsPreviewResponse,
		unknown,
		ListPaginatedPlantsPreviewResponse,
		ListPaginatedPlantsPreviewResponse,
		[PlantQueryKeys]
	>,
	'queryKey' | 'queryFn' | 'getNextPageParam' | 'meta'
> & {
	meta?: { perPage: number; limit?: number };
};

const listPaginatedPlantsPreview = async ({
	signal,
	pageParam,
	meta,
}: ListPaginatedPlantsPreviewProps) => {
	const params = {
		...pageParam,
		perPage: pageParam?.perPage || meta?.perPage,
	};

	const result = await api.get<ListPaginatedPlantsPreviewResponse>('/plants/preview', {
		params: params,
		signal,
	});

	return result.data;
};

export const useListPaginatedPlantsPreview = (props?: UseListPaginatedPlantsPreviewProps) => {
	const queryKey = [PlantQueryKeys.LIST_PAGINATED_PREVIEW] as [PlantQueryKeys];

	const selectLimitedData = (
		data: InfiniteData<ListPaginatedPlantsPreviewResponse>,
		limit: number,
		perPage: number
	) => {
		const sliceAmount = Math.floor(perPage / limit);
		const pages = data.pages.slice(0, sliceAmount);

		if (pages.length > 1) {
			return { pageParams: data.pageParams, pages: data.pages.slice(sliceAmount).slice(limit) };
		}

		const limitedPage = pages.map((page) => ({ ...page, data: page.data.slice(0, limit) }));
		return { pageParams: data.pageParams, pages: limitedPage };
	};

	const handleSelect = (data: InfiniteData<ListPaginatedPlantsPreviewResponse>) => {
		const limit = props?.meta?.limit;
		const perPage = props?.meta?.perPage;

		if (!limit || !perPage) return data;

		return selectLimitedData(data, limit, perPage);
	};

	const handleGetNextPageParam = (
		lastPage: ListPaginatedPlantsPreviewResponse,
		pages: ListPaginatedPlantsPreviewResponse[]
	): ListPaginatedPlantsPreviewParams | undefined => {
		const limit = props?.meta?.limit;
		const params: ListPaginatedPlantsPreviewParams = {
			perPage: props?.meta?.perPage || 10,
			lastKey: lastPage.lastKey,
		};

		if (limit === undefined) {
			return lastPage.hasMore ? params : undefined;
		}

		const fetchedDataLength = pages.reduce((acc, curr) => {
			return acc + curr.data.length;
		}, 0);
		return fetchedDataLength < limit ? params : undefined;
	};

	return useInfiniteQuery(queryKey, listPaginatedPlantsPreview, {
		...props,
		select: handleSelect,
		getNextPageParam: handleGetNextPageParam,
	});
};
