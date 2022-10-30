const getCurrentTimestamp = () => new Date().getTime();

const generateKey = (src: File | string) => {
	if (typeof src === 'string') {
		return src.split('.').slice(-2).join();
	}

	const timestamp = getCurrentTimestamp().toString(32);
	const fileSize = src.size.toString(32);

	return `${timestamp}${fileSize}`;
};

const readFileURL = (file: File, onLoadedURL: (url: string) => void) => {
	const reader = new FileReader();

	reader.onload = function (event) {
		const url = event.target?.result;
		if (typeof url === 'string') {
			onLoadedURL(url);
		}
	};

	reader.readAsDataURL(file);
};

export const imageSelectorHelpers = {
	generateKey,
	readFileURL,
};
