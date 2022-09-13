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

	const defaultRedirectData: RedirectData = {
		redirectTo: '/',
		validateRedirect: () => false,
	};

	const redirectData = getRedirectRoutesFactory().getRedirectData(pathname) || defaultRedirectData;

	return redirectData;
};

const getRedirectRoutesFactory = (() => {
	const routes: Map<string, RedirectData> = new Map();

	const subscribe = (route: LoginRoutes, data: RedirectData) => {
		routes.set(route, data);
	};

	const getRedirectData = (route: string) => {
		return routes.get(route);
	};

	return () => ({
		subscribe,
		getRedirectData,
	});
})();

(() => {
	const validateRedirect = (isAuthenticated: boolean) => {
		return isAuthenticated;
	};
	getRedirectRoutesFactory().subscribe(LoginRoutes.LOGIN, { redirectTo: '/', validateRedirect });
})();

(() => {
	const validateRedirect = (isAuthenticated: boolean) => {
		return !isAuthenticated;
	};
	getRedirectRoutesFactory().subscribe(LoginRoutes.SIGNUP, { redirectTo: '/', validateRedirect });
})();
