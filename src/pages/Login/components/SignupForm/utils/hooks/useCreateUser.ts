import { useState, useCallback } from 'react';
import { type AxiosError } from 'axios';

import { api } from '@services/api';
import { useRequestControlers } from '@hooks/useRequestControllers';

import type { RequestData } from '@interfaces/api/requestData';

export type CreateUserValues = {
	email: string;
	password: string;
};

export const useCreateUser = () => {
	const controllers = useRequestControlers();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const requestCreateUser = useCallback(
		async (values: CreateUserValues): Promise<RequestData<null, AxiosError>> => {
			try {
				await api.post('/users', values, {
					signal: controllers.abortController.signal,
				});
				if (!controllers.isMounted) return controllers.createCanceled();

				return controllers.createSuccess(null);
			} catch (err) {
				if (!controllers.isMounted || controllers.isAborted) {
					return controllers.createCanceled();
				}
				return controllers.createError(err as AxiosError);
			}
		},
		[controllers]
	);

	const createUser = useCallback(
		async (values: CreateUserValues) => {
			setIsSubmitting(true);
			const response = await requestCreateUser(values);
			setIsSubmitting(false);
			return response;
		},
		[requestCreateUser]
	);

	return [isSubmitting, createUser] as [boolean, typeof createUser];
};
