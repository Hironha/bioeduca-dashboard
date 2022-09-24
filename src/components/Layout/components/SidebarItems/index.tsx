import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { RiPlantLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFileEarmarkText } from 'react-icons/bs';

export const SidebarItems = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedModule, setSelectedModule] = useState<string>(
		location.pathname.split('/').slice(0, 2).join('/')
	);

	useEffect(() => {
		const modulesPaths = ['/', '/plants', '/plant-informations'];
		const currentModulePath = location.pathname.split('/').slice(0, 2).join('/');

		const modulePath = modulesPaths.find((path) => path === currentModulePath);

		if (modulePath) setSelectedModule(modulePath);
	}, [location.pathname]);

	return (
		<Menu
			theme="dark"
			mode="inline"
			selectedKeys={[selectedModule]}
			items={[
				{
					key: '/',
					icon: <AiOutlineHome />,
					onClick: () => navigate('/'),
					label: 'Home',
				},
				{
					key: '/plants',
					icon: <RiPlantLine />,
					onClick: () => navigate('/plants'),
					label: 'Plantas',
				},
				{
					key: '/plant-informations',
					icon: <BsFileEarmarkText />,
					onClick: () => navigate('/plant-informations'),
					label: 'Informações das plantas',
				},
			]}
		/>
	);
};
