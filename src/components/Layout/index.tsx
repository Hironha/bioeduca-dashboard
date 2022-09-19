import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, notification } from 'antd';
import { getAuth, signOut } from 'firebase/auth';

import { SidebarItems } from './components/SidebarItems';
import {
	PageHeader,
	PageContent,
	PageSider,
	IconImage,
	ImageContainer,
	LogoutText,
	ProjectName,
	LogoContainer,
	PageHeaderContent,
} from './styles';

import BioEducaIcon from '@assets/images/bioeduca-icon.png';

type LayoutProps = {
	children?: React.ReactNode;
};

export const PageLayout = ({ children }: LayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const auth = getAuth();

	const errorNotification = () => {
		notification.error({
			message: 'Ocorreu algum problema no processo de logout',
		});
	};

	const logout = () => {
		signOut(auth)
			.then(() => {
				navigate('/login');
			})
			.catch((error) => {
				errorNotification();
				console.log(error);
			});
	};

	return (
		<Layout hasSider>
			<PageSider
				collapsible
				collapsedWidth="80"
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				width={'265px'}
			>
				<LogoContainer>
					<ImageContainer>
						<IconImage src={BioEducaIcon} alt="Ícone do projeto BioEduca" />
					</ImageContainer>
				</LogoContainer>

				<SidebarItems />
			</PageSider>

			<Layout>
				<PageHeader>
					<ProjectName>PROJETO BIOEDUCA</ProjectName>
					<PageHeaderContent>
						<LogoutText onClick={logout}>Sair</LogoutText>
					</PageHeaderContent>
				</PageHeader>

				<PageContent>{children}</PageContent>
			</Layout>
		</Layout>
	);
};
