import styled from 'styled-components';
import { Layout } from 'antd';

export const PageHeader = styled(Layout.Header)`
	background: ${(props) => props.theme.colors.primary};
	display: flex;
	justify-content: center;
`;

export const PageContent = styled(Layout.Content)`
	margin: 16px;
	overflow: initial;
	background: #fff;
	padding: 36px;
	min-height: 100vh;
`;

export const PageSider = styled(Layout.Sider)``;

export const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ImageContainer = styled.div`
	background-color: #fff;
	border-radius: 50%;
	margin: 15px;
`;

export const IconImage = styled.img`
	max-width: 60px;
	max-height: 60px;
	object-fit: contain;
`;

export const LogoutText = styled.span`
	cursor: pointer;
	color: #fff;
`;

export const ProjectName = styled.h2`
	color: #fff;
	font-weight: bold;
`;

export const PageHeaderContent = styled.div`
	position: absolute;
	right: 0;
	margin-right: 50px;

	@media (max-width: 600px) {
		margin-right: 20px;
	}

	@media (max-width: 500px) {
		margin-right: 10px;
	}
`;
