import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RiPlantLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFileEarmarkText } from 'react-icons/bs';

export const SidebarItems = () => {
	const navigate = useNavigate();

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={['1']}
			items={[
				{
					key: '1',
					icon: <AiOutlineHome />,
					onClick: () => navigate('/'),
					label: 'Home',
				},
				{
					key: '2',
					icon: <RiPlantLine />,
					onClick: () => navigate('/plants'),
					label: 'Plantas',
				},
				{
					key: '3',
					icon: <BsFileEarmarkText />,
					onClick: () => navigate('/plant-informations'),
					label: 'Informações das plantas',
				},
			]}
		/>
	);
};
