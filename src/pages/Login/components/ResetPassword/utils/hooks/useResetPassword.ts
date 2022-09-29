import { useCallback, useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

import { useRequestControlers } from '@hooks/useRequestControllers';

import type { RequestData } from '@interfaces/api/requestData';

export const useSendResetPasswordEmail = () => {
	const [controllers] = useRequestControlers();
	const [loading, setLoading] = useState(false);

	const requestSendResetPasswordEmail = useCallback(
		async (email: string): Promise<RequestData<null, null>> => {
			try {
				const auth = getAuth();
				await sendPasswordResetEmail(auth, email);
				if (!controllers.isMounted) return controllers.createCanceledData();
				return controllers.createSuccessData(null);
			} catch (err) {
				if (controllers.isAborted || !controllers.isMounted) {
					return controllers.createCanceledData();
				}
				return controllers.createErrorData(null);
			}
		},
		[controllers]
	);

	const sendResetPasswordEmail = useCallback(
		async (email: string) => {
			setLoading(true);
			const requestData = await requestSendResetPasswordEmail(email);
			setLoading(false);
			return requestData;
		},
		[requestSendResetPasswordEmail]
	);

	return [loading, sendResetPasswordEmail] as [boolean, typeof sendResetPasswordEmail];
};
