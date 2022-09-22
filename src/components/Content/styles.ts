import styled from 'styled-components';
import { Typography, Space } from 'antd';

export const ContentHeader = styled(Typography.Title).attrs(({ level }) => ({ level: level || 3 }))`
	width: 100%;
	text-align: center;
`;

export const ContentDescription = styled(Typography.Text)`
	width: 100%;
`;

export const ContentContainer = styled(Space)`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
`;

export const ContentBody = styled(Space)`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
	margin-top: 36px;
`;
