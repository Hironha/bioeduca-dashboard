import {
	type ErrorRequest,
	type SuccessRequest,
	type CanceledRequest,
} from '@interfaces/api/requestData';

export class RequestControllers {
	public isMounted = true;

	constructor(public abortController = new AbortController()) {}

	dismount() {
		this.abortController.abort();
		this.isMounted = false;
	}

	createCanceledData(): CanceledRequest {
		return { isCanceled: true };
	}

	createErrorData<E>(err: E): ErrorRequest<E> {
		return { error: err, isCanceled: false, isError: true };
	}

	createSuccessData<T>(data: T): SuccessRequest<T> {
		return { data, isCanceled: false, isError: false };
	}

	get isAborted() {
		return this.abortController.signal.aborted;
	}
}
