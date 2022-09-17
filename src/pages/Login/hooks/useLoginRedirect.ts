import { useLocation } from 'react-router-dom';

export enum LoginRoutes {
	LOGIN = '/login',
	SIGNUP = '/signup',
	RESET_PASSWORD = '/reset-password',
}

type RedirectData = {
	redirectTo: string;
	validateRedirect: (isAuthenticated: boolean) => boolean;
};

export const useLoginRedirect = () => {
	const { pathname } = useLocation();

	const redirectData = getRedirectRoutesFactory().getRedirectData(pathname);

	return redirectData;
};

const getRedirectRoutesFactory = (() => {
	const loginRedirect: RedirectData = {
		redirectTo: '/',
		validateRedirect: (isAuthenticated) => isAuthenticated,
	};

	const signupRedirect: RedirectData = {
		redirectTo: '/login',
		validateRedirect: (isAuthenticated) => !isAuthenticated,
	};

	const resetPasswordRedirect: RedirectData = {
		redirectTo: '/',
		validateRedirect: (isAuthenticated) => isAuthenticated,
	};

	const defaultRedirectData: RedirectData = {
		redirectTo: '/',
		validateRedirect: () => false,
	};

	const getRedirectData = (route: string) => {
		if (route === LoginRoutes.LOGIN) return loginRedirect;
		if (route === LoginRoutes.SIGNUP) return signupRedirect;
		if (route === LoginRoutes.RESET_PASSWORD) return resetPasswordRedirect;
		return defaultRedirectData;
	};

	return () => ({
		getRedirectData,
	});
})();
