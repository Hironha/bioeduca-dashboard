import { useLocation } from 'react-router-dom';

enum LoginRoutes {
	LOGIN = '/login',
	SIGNUP = '/signup',
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
		redirectTo: '/',
		validateRedirect: (isAuthenticated) => !isAuthenticated,
	};

	const defaultRedirectData: RedirectData = {
		redirectTo: '/',
		validateRedirect: () => false,
	};

	const getRedirectData = (route: string) => {
		if (route === LoginRoutes.LOGIN) return loginRedirect;
		if (route === LoginRoutes.SIGNUP) return signupRedirect;
		return defaultRedirectData;
	};

	return () => ({
		getRedirectData,
	});
})();
