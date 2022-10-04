import { Row, Col } from 'antd';

import { Content } from '@components/Content';
import { QuickAccessCard } from './components/QuickAccessCard';

import { RiPlantLine } from 'react-icons/ri';
import { BsFileEarmarkText } from 'react-icons/bs';
import { MdOutlineAddCircleOutline, MdOutlineNoteAdd } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { ContentBody } from './styles';

export const QuickAccess = () => {
	return (
		<Content.Container>
			<Content.Header level={3}>Acesso rápido</Content.Header>
			<ContentBody>
				<Row gutter={[24, 24]}>
					<Col span={6} xs={24} sm={12} md={8} lg={6}>
						<QuickAccessCard
							icon={<RiPlantLine size={25} />}
							description={'Listar todas as plantas cadastradas'}
							path={'/plants'}
						/>
					</Col>
					<Col span={6} xs={24} sm={12} md={8} lg={6}>
						<QuickAccessCard
							icon={<MdOutlineAddCircleOutline size={25} />}
							description={'Cadastrar uma nova planta'}
							path={'/plants/create'}
						/>
					</Col>
					<Col span={6} xs={24} sm={12} md={8} lg={6}>
						<QuickAccessCard
							icon={<BsFileEarmarkText size={25} />}
							description={'Listar todas as informações cadastradas'}
							path={'/plant-informations'}
						/>
					</Col>
					<Col span={6} xs={24} sm={12} md={8} lg={6}>
						<QuickAccessCard
							icon={<MdOutlineNoteAdd size={25} />}
							description={'Cadastrar uma nova informação sobre as plantas'}
							path={'/plant-informations/create'}
						/>
					</Col>
					<Col span={6} xs={24} sm={12} md={8} lg={6}>
						<QuickAccessCard
							icon={<AiOutlineUserAdd size={25} />}
							description={'Criar uma nova conta'}
							path={'/signup'}
						/>
					</Col>
				</Row>
			</ContentBody>
		</Content.Container>
	);
};
