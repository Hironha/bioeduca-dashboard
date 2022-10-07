import { useContext } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { PageLayout } from '@components/Layout';
import { Redirect } from '@components/Redirect';
import { Home } from './outlets/OverviewPage';
import { HomeContainer } from './styles';

import { AuthContext } from '@providers/AuthProvider';

export const useHomeRoutes = (): RouteObject[] => {
	const { verifyAuthentication } = useContext(AuthContext);

	const homeContainer = (
		<Redirect to="/login" validation={!verifyAuthentication()}>
			<PageLayout>
				<HomeContainer>
					<Outlet />
				</HomeContainer>
			</PageLayout>
		</Redirect>
	);

	return [
		{
			element: homeContainer,
			children: [
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	];
};
