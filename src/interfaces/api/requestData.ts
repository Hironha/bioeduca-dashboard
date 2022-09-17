type CancelableRequest<C extends boolean> = {
	isCanceled: C;
};

type ReturnedRequest<E extends boolean> = CancelableRequest<false> & {
	isError: E;
};

export type CanceledRequest = CancelableRequest<true>;

export type SuccessRequest<T> = ReturnedRequest<false> & {
	data: T;
};

export type ErrorRequest<T> = ReturnedRequest<true> & {
	error: T;
};

export type RequestData<T, E> = SuccessRequest<T> | ErrorRequest<E> | CanceledRequest;
