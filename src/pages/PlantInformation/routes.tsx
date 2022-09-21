import { useContext } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { Redirect } from '@components/Redirect';
import { AuthContext } from '@providers/AuthProvider';

import { PageLayout } from '@components/Layout';
import { CreatePlantInformationPage } from './components/CreatePlantInformationPage';
import { ListPlantInformationsPage } from './components/ListPlantInformationsPage';

export const usePlantInformationRoutes = (): RouteObject[] => {
	const { verifyAuthentication } = useContext(AuthContext);

	return [
		{
			element: (
				<Redirect to="login" validation={!verifyAuthentication()}>
					<PageLayout>
						<Outlet />
					</PageLayout>
				</Redirect>
			),
			children: [
				{ path: '/plant-informations', element: <ListPlantInformationsPage /> },
				{ path: '/plant-informations/create', element: <CreatePlantInformationPage /> },
			],
		},
	];
};
