import styled from 'styled-components';
import { Typography } from 'antd';

export const ModalTitle = styled(Typography.Title).attrs(() => ({ level: 4 }))`
	text-align: center;
`;

export const LoadingContainer = styled.div`
	width: 100%;
	justify-content: center;
	align-items: center;
`;
