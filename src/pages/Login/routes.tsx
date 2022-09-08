import { Outlet, type RouteObject } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import {
	LoginContainer,
	LoginPageContainer,
	ImageContainer,
	BannerImage,
	LoginDivider,
} from './styles';

import BioEducaBanner from '@assets/images/bioeduca-banner.jpg';

export const useLoginRoutes = (): RouteObject[] => {
	return [
		{
			element: (
				<LoginContainer>
					<LoginPageContainer>
						<Outlet />
						<LoginDivider />
						<ImageContainer>
							<BannerImage src={BioEducaBanner} alt="BioEduca Banner" />
						</ImageContainer>
					</LoginPageContainer>
				</LoginContainer>
			),
			children: [
				{
					path: '/login',
					element: <LoginForm />,
				},
			],
		},
	];
};
