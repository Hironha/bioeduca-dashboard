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

const selectLimitedPagesData = (
	data: InfiniteData<ListPaginatedPlantsPreviewResponse>,
	limit: number
) => {
	const pages = data.pages.slice(0, limit);
	return { pageParams: data.pageParams, pages };
};

export const useListPaginatedPlantsPreview = (props?: UseListPaginatedPlantsPreviewProps) => {
	const queryKey = [PlantQueryKeys.LIST_PAGINATED_PREVIEW] as [PlantQueryKeys];

	const handleSelect = (data: InfiniteData<ListPaginatedPlantsPreviewResponse>) => {
		const limit = props?.meta?.limit;
		const perPage = props?.meta?.perPage;

		if (!limit || !perPage) return data;
		return selectLimitedPagesData(data, limit);
	};

	const createParams = (perPage?: number, lastKey?: string): ListPaginatedPlantsPreviewParams => {
		return {
			perPage: perPage || 10,
			lastKey,
		};
	};

	const handleGetNextPageParam = (
		lastPage: ListPaginatedPlantsPreviewResponse,
		pages: ListPaginatedPlantsPreviewResponse[]
	): ListPaginatedPlantsPreviewParams | undefined => {
		const limit = props?.meta?.limit;
		const params = createParams(props?.meta?.perPage, lastPage.lastKey);

		if (limit === undefined) {
			return lastPage.hasMore ? params : undefined;
		}

		return pages.length < limit ? params : undefined;
	};

	return useInfiniteQuery(queryKey, listPaginatedPlantsPreview, {
		...props,
		select: handleSelect,
		getNextPageParam: handleGetNextPageParam,
	});
};
