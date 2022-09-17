import { useContext } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { Redirect } from '@components/Redirect';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import {
	LoginContainer,
	LoginPageContainer,
	ImageContainer,
	BannerImage,
	OutletContainer,
	LoginDivider,
} from './styles';

import { AuthContext } from '@providers/AuthProvider';
import { useLoginRedirect } from './hooks/useLoginRedirect';
import BioEducaBanner from '@assets/images/bioeduca-banner.jpg';

enum LoginRoutes {
	LOGIN = '/login',
	SIGNUP = '/signup',
}

export const useLoginRoutes = (): RouteObject[] => {
	const { verifyAuthentication } = useContext(AuthContext);
	const { redirectTo, validateRedirect } = useLoginRedirect();

	const isAuthenticated = verifyAuthentication();

	return [
		{
			element: (
				<Redirect to={redirectTo} validation={validateRedirect(isAuthenticated)}>
					<LoginContainer>
						<LoginPageContainer>
							<OutletContainer>
								<Outlet />
							</OutletContainer>
							<LoginDivider />
							<ImageContainer>
								<BannerImage src={BioEducaBanner} alt="BioEduca Banner" />
							</ImageContainer>
						</LoginPageContainer>
					</LoginContainer>
				</Redirect>
			),
			children: [
				{
					path: LoginRoutes.LOGIN,
					element: <LoginForm />,
				},
				{
					path: LoginRoutes.SIGNUP,
					element: <SignupForm />,
				},
			],
		},
	];
};
