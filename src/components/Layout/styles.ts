import styled from 'styled-components';
import { Layout } from 'antd';

export const Logo = styled.div`
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
`;

export const PageHeader = styled(Layout.Header)`
	background: ${(props) => props.theme.colors.primary};
	display: flex;
	justify-content: space-between;
`;

export const PageContent = styled(Layout.Content)`
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

export const PageSider = styled(Layout.Sider)``;

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	border-radius: 50%;
	margin: 6px;
`;

export const IconImage = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
`;

export const LogoutContainer = styled.span`
	cursor: pointer;
	display: flex;
	align-items: center;
	color: #fff;
	margin: 14px 0;
`;

export const IconContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1rem;
`;

export const ProjectName = styled.h2`
	color: #fff;
	font-weight: bold;
`;