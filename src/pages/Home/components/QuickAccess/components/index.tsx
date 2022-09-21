import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { CardContainer, IconContainer, DescriptionContainer } from './styles';

type QuickAccessCardProps = {
	icon: React.ReactNode;
	description: string;
	path: string;
};

export const QuickAccessCard = ({ icon, description, path }: QuickAccessCardProps) => {
	const navigate = useNavigate();

	return (
		<CardContainer onClick={() => navigate(path)}>
			<IconContainer>{icon}</IconContainer>
			<DescriptionContainer>
				<Typography.Paragraph>{description}</Typography.Paragraph>
			</DescriptionContainer>
		</CardContainer>
	);
};
