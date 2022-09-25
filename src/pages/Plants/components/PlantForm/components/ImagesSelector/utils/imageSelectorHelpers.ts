const getCurrentTimestamp = () => new Date().getTime();

const generateKey = (file: File) => {
	const timestamp = getCurrentTimestamp().toString(32);
	const fileSize = file.size.toString(32);

	return `${timestamp}${fileSize}`;
};

export const imageSelectorHelpers = {
	generateKey,
};
