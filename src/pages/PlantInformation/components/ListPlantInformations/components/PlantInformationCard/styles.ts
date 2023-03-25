import styled from 'styled-components';
import { Typography } from 'antd';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	padding: 24px;
	width: 100%;
	height: 260px;
	border-radius: ${(props) => props.theme.border.radius};
	border-top: 4px ${(props) => props.theme.colors.primary} solid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const Title = styled(Typography.Title).attrs(() => ({ level: 4 }))`
	flex: 1;
	margin: 0 !important;
`;

export const Order = styled(Typography.Text).attrs(() => ({ strong: true }))`
	color: ${(props) => props.theme.colors.primary};
`;

export const DescriptionContainer = styled.div`
	flex: 1;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
