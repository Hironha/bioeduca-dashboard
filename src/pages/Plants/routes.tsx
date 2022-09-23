import { useContext } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { Redirect } from '@components/Redirect';
import { AuthContext } from '@providers/AuthProvider';

import { PageLayout } from '@components/Layout';
import { ListPlantsPage } from './components/ListPlantsPage';

export const usePlantsRoutes = (): RouteObject[] => {
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
			children: [{ path: '/plants', element: <ListPlantsPage /> }],
		},
	];
};