import { Typography, Button } from 'antd';
import { CardContainer, ButtonContainer, DescriptionContainer } from './styles';

type PlantInformationCardProps = {
	id: string;
	fieldName: string;
	description: string;
	onDelete: () => void | Promise<void>;
};

export const PlantInformationCard = ({
	description,
	fieldName,
	onDelete,
}: PlantInformationCardProps) => {
	return (
		<CardContainer>
			<Typography.Title level={4}>{fieldName}</Typography.Title>

			<DescriptionContainer>
				<Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: '...' }}>
					{description}
				</Typography.Paragraph>
			</DescriptionContainer>

			<ButtonContainer>
				<Button type="primary" ghost danger onClick={onDelete}>
					Excluir
				</Button>
				<Button type="primary">Editar</Button>
			</ButtonContainer>
		</CardContainer>
	);
};
