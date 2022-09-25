import styled from 'styled-components';
import { Space } from 'antd';

export const ActionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
`;

export const FormInputsSpacer = styled(Space).attrs(() => ({
	direction: 'vertical',
	size: 'small',
}))`
	width: 100%;
`;
