import styled from 'styled-components';
import { Content, Header } from 'antd/lib/layout/layout';

export const Logo = styled.div`
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
`;

export const PageHeader = styled(Header)`
	background: ${(props) => props.theme.colors.primary};
	display: flex;
`;

export const PageContent = styled(Content)`
	margin: 16px;
	overflow: initial;
	background: #fff;
`;

export const PageTrigger = styled.span`
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0 3px;
	margin: 14px 0;
`;
