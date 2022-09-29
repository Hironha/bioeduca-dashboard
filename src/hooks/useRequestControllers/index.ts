import { useRef, useEffect, useCallback } from 'react';

import { RequestControllers } from './requestControllers';

export const useRequestControlers = (): [RequestControllers] => {
	const controllers = useRef<RequestControllers | null>(null);

	const getControllers = useCallback(() => {
		if (!controllers.current) {
			controllers.current = new RequestControllers();
		}

		return controllers.current;
	}, []);

	useEffect(() => {
		return () => {
			const controllers = getControllers();
			controllers.dismount();
		};
	}, [getControllers]);

	return [getControllers()];
};
