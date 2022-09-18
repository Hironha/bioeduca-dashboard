import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TbEdit } from 'react-icons/tb';
import { RiPlantLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineDocumentAdd, HiOutlineFolderAdd } from 'react-icons/hi';

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
					onClick: () => navigate('/plant-informations/create'),
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
	);
};
