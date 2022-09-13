import { useContext } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { PageLayout } from '@components/Layout';
import { Redirect } from '@components/Redirect';
import { AuthContext } from '@providers/AuthProvider';
import { HomeContainer } from './styles';

export const useHomeRoutes = (): RouteObject[] => {
	const { verifyAuthentication } = useContext(AuthContext);

	const isAuthenticated = verifyAuthentication();

	return [
		{
			element: (
				<Redirect to="/login" validation={!isAuthenticated}>
					<HomeContainer>
						<Outlet />
					</HomeContainer>
				</Redirect>
			),
			children: [
				{
					path: '/',
					element: <PageLayout />,
				},
			],
		},
	];
};
