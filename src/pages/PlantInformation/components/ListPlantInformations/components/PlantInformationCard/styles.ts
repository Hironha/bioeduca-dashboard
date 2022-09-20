import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	padding: 24px;
	width: 100%;
	height: 240px;
	border-radius: ${(props) => props.theme.border.radius};
	border-top: 4px ${(props) => props.theme.colors.primary} solid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const DescriptionContainer = styled.div`
	flex: 1;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;
