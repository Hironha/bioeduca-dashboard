import { Typography, Button } from 'antd';
import { CardContainer, ButtonContainer, DescriptionContainer } from './styles';

type PlantInformationCardProps = {
	fieldName: string;
	description: string;
};

export const PlantInformationCard = ({ description, fieldName }: PlantInformationCardProps) => {
	return (
		<CardContainer>
			<Typography.Title level={4}>{fieldName}</Typography.Title>

			<DescriptionContainer>
				<Typography.Paragraph ellipsis={{ rows: 3, expandable: false, symbol: '...' }}>
					{description}
				</Typography.Paragraph>
			</DescriptionContainer>

			<ButtonContainer>
				<Button type="primary">Editar</Button>
			</ButtonContainer>
		</CardContainer>
	);
};
