import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

import { UserQueryKeys } from './keys';

export type SendResetPasswordEmailPayload = string;

type UseSendResetPasswordEmailProps = Omit<
	UseMutationOptions<void, unknown, SendResetPasswordEmailPayload, [UserQueryKeys]>,
	'mutationKey' | 'mutationFn'
>;

const sendResetPasswordEmail = async (email: SendResetPasswordEmailPayload) => {
	const auth = getAuth();
	await sendPasswordResetEmail(auth, email);
};

export const useSendResetPasswordEmail = (props?: UseSendResetPasswordEmailProps) => {
	const queryKey = [UserQueryKeys.SEND_PASSWORD_RESET_EMAIL] as [UserQueryKeys];

	return useMutation(queryKey, sendResetPasswordEmail, props);
};
