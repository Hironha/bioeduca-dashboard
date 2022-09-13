import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import {
	Logo,
	PageHeader,
	PageContent,
	PageSider,
	IconImage,
	ImageContainer,
	LogoutText,
	IconContainer,
	ProjectName,
} from './styles';

import BioEducaIcon from '@assets/images/bioeduca-icon.png';

import { AiOutlineHome, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { RiPlantLine } from 'react-icons/ri';
import { HiOutlineDocumentAdd, HiOutlineFolderAdd } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

export const PageLayout = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout hasSider>
			<PageSider
				collapsible
				collapsedWidth="80"
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Logo />
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
					<IconContainer>
						<ProjectName>PROJETO</ProjectName>
						<ImageContainer>
							<IconImage src={BioEducaIcon} alt="Ícone do projeto BioEduca" />
						</ImageContainer>
						<ProjectName>BIOEDUCA</ProjectName>
					</IconContainer>

					<LogoutText onClick={() => console.log('Logout')}>Sair</LogoutText>
				</PageHeader>

				<PageContent>
					<div
						className="site-layout-background"
						style={{
							padding: 24,
							textAlign: 'center',
						}}
					>
						<p>long content</p>
						{
							// indicates very long content
							Array.from(
								{
									length: 100,
								},
								(_, index) => (
									<React.Fragment key={index}>
										{index % 20 === 0 && index ? 'more' : '...'}
										<br />
									</React.Fragment>
								)
							)
						}
					</div>
				</PageContent>
			</Layout>
		</Layout>
	);
};
