import { useRef, useEffect } from 'react';

type Controller = {
	get isMounted(): boolean;
	get abortController(): AbortController;
};

export const useRequestControlers = () => {
	const isMounted = useRef(true);
	const abortController = useRef<AbortController | null>(null);
	const controllers = useRef<Controller | null>(null);

	const getAbortController = () => {
		if (abortController.current === null) {
			abortController.current = new AbortController();
		}
		return abortController.current;
	};

	const getControllers = () => {
		if (controllers.current === null) {
			controllers.current = {
				get isMounted() {
					return isMounted.current;
				},
				get abortController() {
					return getAbortController();
				},
			};
		}
		return controllers.current;
	};

	useEffect(() => {
		isMounted.current = true;
		abortController.current = new AbortController();

		return () => {
			isMounted.current = false;
			if (abortController.current) abortController.current.abort();
		};
	}, []);

	return getControllers();
};
