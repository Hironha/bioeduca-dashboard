import styled from 'styled-components';
import { Typography } from 'antd';

export const ModalTitle = styled(Typography.Title).attrs(() => ({ level: 4 }))`
	text-align: center;
`;

export const QRCodeContainer = styled.div`
	margin-top: 24px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
