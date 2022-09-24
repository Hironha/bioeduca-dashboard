import styled from 'styled-components';
import { Space } from 'antd';

export const CardContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-direction: column;
	align-items: stretch;

	padding: 16px 24px;
	width: 100%;
	height: 100%;
	border-radius: ${(props) => props.theme.border.radius};
	border-top: 4px ${(props) => props.theme.colors.primary} solid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const CardHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	word-wrap: break-word;
`;

export const CardTitle = styled.span`
	font-weight: bold;
	font-size: 18px;
`;

export const CardSubtitle = styled.span`
	font-size: 14px;
	font-style: italic;
`;

export const CardImageContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardImage = styled.img`
	width: 100%;
	max-height: 130px;
	border-radius: ${(props) => props.theme.border.radius};
	object-position: center;
	object-fit: contain;
	align-self: center;
`;

export const CardActionsContainer = styled(Space)`
	margin-top: 12px;
	display: flex;
	justify-content: space-between;
`;
