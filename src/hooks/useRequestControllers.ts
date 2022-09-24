import type { CanceledRequest, ErrorRequest, SuccessRequest } from '@interfaces/api/requestData';

import { useRef, useEffect } from 'react';

type Controller = {
	get isMounted(): boolean;
	get abortController(): AbortController;
	get isAborted(): boolean;
	createErrorData<E>(error: E): ErrorRequest<E>;
	createSuccessData<T>(data: T): SuccessRequest<T>;
	createCanceledData(): CanceledRequest;
};

export const useRequestControlers = () => {
	const isMounted = useRef(true);
	const abortController = useRef<AbortController>(new AbortController());
	const controllers = useRef<Controller | null>(null);

	const getControllers = () => {
		if (controllers.current === null) {
			controllers.current = {
				get isMounted() {
					return isMounted.current;
				},
				get abortController() {
					return abortController.current;
				},
				get isAborted() {
					return abortController.current.signal.aborted;
				},
				createCanceledData() {
					return { isCanceled: true };
				},
				createErrorData(err) {
					return { error: err, isCanceled: false, isError: true };
				},
				createSuccessData(data) {
					return { data, isCanceled: false, isError: false };
				},
			};
		}
		return controllers.current;
	};

	useEffect(() => {
		const controller = abortController.current;

		return () => {
			isMounted.current = false;
			if (controller) controller.abort();
		};
	}, []);

	return getControllers();
};
