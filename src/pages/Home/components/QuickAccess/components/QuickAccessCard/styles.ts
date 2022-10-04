import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	padding: 16px 16px 0 16px;
	width: 100%;
	max-height: 150px;
	height: 100%;
	border-radius: ${(props) => props.theme.border.radius};
	border-top: 4px ${(props) => props.theme.colors.primary} solid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  cursor: pointer;
`;

export const DescriptionContainer = styled.div`
	flex: 1;
`;

export const IconContainer = styled.span`
	color: ${(props) => props.theme.colors.primary};
	display: flex;
	align-items: center;
  justify-content: center;
`;
