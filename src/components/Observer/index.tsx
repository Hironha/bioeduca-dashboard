import { useEffect, useRef } from 'react';

type ObserverProps = {
	callback: IntersectionObserverCallback;
	options?: IntersectionObserverInit;
	className?: string;
	children?: React.ReactNode;
};

export const Observer = ({ className, callback, options, children }: ObserverProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const callbackRef = useRef<IntersectionObserverCallback>(callback);
	const optionsRef = useRef<IntersectionObserverInit | undefined>(options);

	useEffect(() => {
		const callback = callbackRef.current;
		const container = containerRef.current;
		const options = optionsRef.current;
		const intersectionObserver = new IntersectionObserver(callback, options);

		if (container) {
			intersectionObserver.observe(container);
		}

		return () => {
			if (container) {
				intersectionObserver.unobserve(container);
			}
		};
	}, []);

	return (
		<div className={className} ref={containerRef}>
			{children}
		</div>
	);
};
