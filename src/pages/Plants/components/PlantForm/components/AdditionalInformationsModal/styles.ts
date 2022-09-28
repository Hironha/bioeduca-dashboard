import styled from 'styled-components';
import { Button } from 'antd';

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
