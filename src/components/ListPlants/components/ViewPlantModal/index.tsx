import { Modal, Typography, Divider, Carousel, type ModalProps } from 'antd';
import { ModalTitle, LoadingContainer } from './styles';
import { Loading } from '@components/Loading';

import { useConsultPlant } from '@services/hooks/plant/useConsultPlant';
import { Fragment, useMemo, useCallback } from 'react';

export type ViewPlantModalProps = Omit<ModalProps, 'footer' | 'children'> & {
	plantId?: string;
};

export const ViewPlantModal = ({ plantId, visible, ...props }: ViewPlantModalProps) => {
	const isVisible = visible && plantId != null;

	const consultPlantResult = useConsultPlant({
		plantId: plantId ?? '',
		options: {
			retry: false,
			refetchOnMount: true,
			enabled: plantId != null,
			cacheTime: 24 * 60 * 1000,
			staleTime: Infinity,
		},
	});

	const normalizeString = useCallback((str: string) => {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}, []);

	const plantData = useMemo(() => {
		return Object.entries(consultPlantResult.data?.additional_informations || []).sort(
			([nameLeft], [nameRight]) => {
				const normalizedNameLeft = normalizeString(nameLeft);
				const normalizedNameRight = normalizeString(nameRight);
				if (normalizedNameLeft > normalizedNameRight) return 1;
				if (normalizedNameLeft < normalizedNameRight) return -1;
				return 0;
			}
		);
	}, [consultPlantResult.data?.additional_informations, normalizeString]);

	return (
		<Modal {...props} visible={isVisible} footer={null}>
			{consultPlantResult.isLoading ? (
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
			) : (
				<>
					<ModalTitle>Dados da planta</ModalTitle>

					<Divider />

					<Carousel dotPosition="top" draggable>
						{consultPlantResult.data?.images.map((image, index) => {
							return <img key={index} src={image} alt="Imagens da planta" />;
						})}
					</Carousel>

					<Divider />

					<Typography.Text strong>Nome Popular</Typography.Text>
					<Typography.Paragraph>{consultPlantResult.data?.popular_name}</Typography.Paragraph>

					<Divider />

					<Typography.Text strong>Nome Científico</Typography.Text>
					<Typography.Paragraph italic>
						{consultPlantResult.data?.scientific_name}
					</Typography.Paragraph>

					<Divider />

					{plantData.map(([key, value]) => {
						return (
							<Fragment key={key}>
								<Typography.Text strong>{key}</Typography.Text>
								<Typography.Paragraph>{value}</Typography.Paragraph>
								<Divider />
							</Fragment>
						);
					})}
				</>
			)}
		</Modal>
	);
};
