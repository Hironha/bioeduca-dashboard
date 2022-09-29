import styled from 'styled-components';
import { Button, Row } from 'antd';

export const LoadingContainer = styled.div`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const AdditionalInformationsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const AddButton = styled(Button)`
	align-self: center;
`;

export const PlantInformationsRow = styled(Row).attrs(() => ({ gutter: [16, 16] }))`
	--base-border-radius: ${props => props.theme.border.radius};

	max-height: 350px;
	padding: 16px;
	margin: 16px 0;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 8px;
		border-radius: var(--base-border-radius);
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: var(--base-border-radius);
	}

	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: var(--base-border-radius);
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;
