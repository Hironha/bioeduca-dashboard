import { useRoutes } from 'react-router-dom';

import { useHomeRoutes } from './Home/routes';
import { useLoginRoutes } from './Login/routes';
import { usePlantsRoutes } from './Plants/routes';
import { usePlantInformationRoutes } from './PlantInformation/routes';

export const PageRoutes = () => {
	const homeRoutes = useHomeRoutes();
	const loginRoutes = useLoginRoutes();
	const plantInformationRoutes = usePlantInformationRoutes();
	const plantsRoutes = usePlantsRoutes();

	const routes = useRoutes([...loginRoutes, ...homeRoutes, ...plantInformationRoutes, ...plantsRoutes]);

	return routes;
};
