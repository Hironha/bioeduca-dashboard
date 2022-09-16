import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
import { getAuth, signOut } from 'firebase/auth';

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

import { AiOutlineHome } from 'react-icons/ai';
import { RiPlantLine } from 'react-icons/ri';
import { HiOutlineDocumentAdd, HiOutlineFolderAdd } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

type LayoutProps = {
	children?: React.ReactNode;
};

export const PageLayout = ({ children }: LayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const auth = getAuth();

	const errorNotification = () => {
		notification.error({
			message: 'Ocorreu algum problema no processo de logout!',
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
			>
				<LogoContainer>
					<ImageContainer>
						<IconImage src={BioEducaIcon} alt="Ícone do projeto BioEduca" />
					</ImageContainer>
				</LogoContainer>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <AiOutlineHome />,
							label: 'Home',
						},
						{
							key: '2',
							icon: <HiOutlineFolderAdd />,
							label: 'Cadastrar uma planta',
						},
						{
							key: '3',
							icon: <HiOutlineDocumentAdd />,
							label: 'Cadastrar informações sobre as plantas',
						},
						{
							key: '4',
							icon: <RiPlantLine />,
							label: 'Todas as plantas',
						},
						{
							key: '5',
							icon: <TbEdit />,
							label: 'Editar uma planta',
						},
					]}
				/>
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
