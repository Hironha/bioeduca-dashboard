import { useConsultPlant } from '@services/hooks/plant/useConsultPlant';

export type ViewPlantProps = {
	plantId: string;
};

export const ViewPlant = ({ plantId }: ViewPlantProps) => {
	const consultPlantResult = useConsultPlant({
		plantId,
		options: {
			retry: false,
			refetchOnMount: true,
			cacheTime: 24 * 60 * 1000,
			staleTime: Infinity,
		},
	});

	if (consultPlantResult.isLoading) {
		return <div>carregando...</div>;
	}

	return <div>TODO</div>;
};
