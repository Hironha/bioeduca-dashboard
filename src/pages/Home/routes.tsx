import { PageLayout } from '@components/Layout';
import { Outlet, type RouteObject } from 'react-router-dom';
import { HomeContainer } from './styles';

// import { LoginForm } from './components/LoginForm';
// import {
// 	LoginContainer,
// 	LoginPageContainer,
// 	ImageContainer,
// 	BannerImage,
// 	LoginDivider,
// } from './styles';

export const useHomeRoutes = (): RouteObject[] => {
	return [
		{
			element: (
				<HomeContainer>
					<Outlet />
				</HomeContainer>
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
