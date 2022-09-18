import { useRoutes } from 'react-router-dom';

import { useLoginRoutes } from './Login/routes';
import { useHomeRoutes } from './Home/routes';
import { usePlantInformationRoutes } from './PlantInformation/routes';

export const PageRoutes = () => {
	const homeRoutes = useHomeRoutes();
	const loginRoutes = useLoginRoutes();
	const plantInformationRoutes = usePlantInformationRoutes();

	const routes = useRoutes([...loginRoutes, ...homeRoutes, ...plantInformationRoutes]);

	return routes;
};
