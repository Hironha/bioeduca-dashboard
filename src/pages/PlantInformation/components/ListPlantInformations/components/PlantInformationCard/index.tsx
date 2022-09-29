import { Typography, Button, notification } from 'antd';
import { CardContainer, ButtonContainer, DescriptionContainer } from './styles';

import { useDeletePlantInformation } from '../../utils/hooks/useDeletePlantInformation';
import { deletePlantInformationNotifications as notifications } from '../../utils/notifications/deletePlantInformation';

type PlantInformationCardProps = {
	id: string;
	fieldName: string;
	description: string;
};

export const PlantInformationCard = ({ id, description, fieldName }: PlantInformationCardProps) => {
	const [isDeleting, deletePlantInformation] = useDeletePlantInformation();

	const handleDeleteError = () => {
		notification.error(notifications.error());
	};

	const handleDeleteSuccess = () => {
		notification.success(notifications.success());
	};

	const _deletePlantInformation = async (id: string) => {
		const requestData = await deletePlantInformation(id);
		if (requestData.isCanceled) return;
		else if (requestData.isError) handleDeleteError();
		else handleDeleteSuccess();
	};

	return (
		<CardContainer>
			<Typography.Title level={4}>{fieldName}</Typography.Title>

			<DescriptionContainer>
				<Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: '...' }}>
					{description}
				</Typography.Paragraph>
			</DescriptionContainer>

			<ButtonContainer>
				<Button type="primary" ghost danger onClick={() => _deletePlantInformation(id)}>Excluir</Button>
				<Button type="primary">Editar</Button>
			</ButtonContainer>
		</CardContainer>
	);
};
