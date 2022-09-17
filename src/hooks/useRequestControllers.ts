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
				get isAborted() {
					return getAbortController().signal.aborted;
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
		isMounted.current = true;
		abortController.current = new AbortController();

		return () => {
			isMounted.current = false;
			if (abortController.current) abortController.current.abort();
		};
	}, []);

	return getControllers();
};
