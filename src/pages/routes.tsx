import { useRoutes } from 'react-router-dom';

import { useLoginRoutes } from './Login/routes';

export const PageRoutes = () => {
	const routes = useRoutes([...useLoginRoutes()]);

	return routes;
};
