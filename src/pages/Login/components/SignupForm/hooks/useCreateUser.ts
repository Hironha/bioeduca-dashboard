import { useState, useCallback } from 'react';
import { type AxiosError } from 'axios';

import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import type { IApiError } from '@interfaces/api/error';

export type CreateUserValues = {
	email: string;
	password: string;
};

export type CreateUserCallbacks = {
	onSuccess?: () => void | Promise<void>;
	onError?: (error: AxiosError<IApiError>) => void | Promise<void>;
};

export const useCreateUser = () => {
	const controllers = useRequestControlers();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createUser = useCallback(
		async (values: CreateUserValues, callbacks?: CreateUserCallbacks) => {
			setIsSubmitting(true);
			try {
				console.log({ controller: controllers.abortController })
				await api.post('/users', values, { signal: controllers.abortController.signal });
				if (!controllers.isMounted) return;

				if (callbacks?.onSuccess) {
					await callbacks.onSuccess();
				}
			} catch (err) {
				if (!controllers.isMounted) return;

				if (callbacks?.onError) {
					await callbacks.onError(err as AxiosError<IApiError>);
				}
			} finally {
				setIsSubmitting(false);
			}
		},
		[controllers]
	);

	return [{ isSubmitting }, createUser] as [{ isSubmitting: boolean }, typeof createUser];
};
