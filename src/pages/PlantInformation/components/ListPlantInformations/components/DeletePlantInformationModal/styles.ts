import styled from 'styled-components';
import { Typography } from 'antd';

export const ModalTitle = styled(Typography.Title).attrs(() => ({ level: 4 }))`
	text-align: center;
`;

export const ModalFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
	margin-top: 24px;
	width: 100%;
`;
