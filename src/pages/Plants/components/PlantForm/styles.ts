import styled from 'styled-components';
import { Form, Space } from 'antd';

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

export const FormItem = styled(Form.Item)`
	font-weight: bold;
`;
