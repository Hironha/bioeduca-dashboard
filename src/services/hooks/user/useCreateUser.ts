import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { api } from '@services/api';
import { UserQueryKeys } from './keys';

export type CreateUserPayload = { email: string; password: string };

type UseCreateUserProps = Omit<
	UseMutationOptions<void, AxiosError, CreateUserPayload, [UserQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const createUser = async (userData: CreateUserPayload) => {
	await api.post('/users', userData);
};

export const useCreateUser = (props?: UseCreateUserProps) => {
	const queryKey = [UserQueryKeys.CREATE] as [UserQueryKeys];

	return useMutation(queryKey, createUser, props);
};
