import { Typography, Button } from 'antd';
import {
	CardContainer,
	ButtonContainer,
	DescriptionContainer,
	TitleContainer,
	Title,
	Order,
} from './styles';
import { type IPlantInformation } from '@interfaces/models/plantInformation';

type PlantInformationCardProps = {
	plantInformation: IPlantInformation;
	onDelete: () => void | Promise<void>;
	onUpdate: (plantInformation: IPlantInformation) => void;
};

export const PlantInformationCard = ({
	plantInformation,
	onUpdate,
	onDelete,
}: PlantInformationCardProps) => {
	const { field_name, description, order } = plantInformation;

	return (
		<CardContainer>
			<TitleContainer>
				<Title level={4}>{field_name}</Title>
				<Order>[{order}]</Order>
			</TitleContainer>

			<DescriptionContainer>
				<Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: '...' }}>
					{description}
				</Typography.Paragraph>
			</DescriptionContainer>

			<ButtonContainer>
				<Button type="primary" ghost danger onClick={onDelete}>
					Excluir
				</Button>
				<Button type="primary" onClick={() => onUpdate(plantInformation)}>
					Editar
				</Button>
			</ButtonContainer>
		</CardContainer>
	);
};
