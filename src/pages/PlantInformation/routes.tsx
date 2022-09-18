import { Outlet, type RouteObject } from 'react-router-dom';

import { PageLayout } from '@components/Layout';
import { CreatePlantInformationPage } from './components/CreatePlantInformationPage';

export const usePlantInformationRoutes = (): RouteObject[] => {
	return [
		{
			element: (
				<PageLayout>
					<Outlet />
				</PageLayout>
			),
			children: [{ path: '/plant-informations/create', element: <CreatePlantInformationPage /> }],
		},
	];
};
