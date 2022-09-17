import type { CanceledRequest, ErrorRequest, SuccessRequest } from '@interfaces/api/requestData';

import { useRef, useEffect } from 'react';

type Controller = {
	get isMounted(): boolean;
	get abortController(): AbortController;
	get isAborted(): boolean;
	createError<E>(error: E): ErrorRequest<E>;
	createSuccess<T>(data: T): SuccessRequest<T>;
	createCanceled(): CanceledRequest;
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
				createCanceled() {
					return { isCanceled: true };
				},
				createError(err) {
					return { error: err, isCanceled: false, isError: true };
				},
				createSuccess(data) {
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
