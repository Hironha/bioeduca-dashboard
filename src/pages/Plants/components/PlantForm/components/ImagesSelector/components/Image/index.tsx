import { useEffect, useState } from 'react';

export type ImageProps = Omit<
	React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
	'src'
> & {
	src: string | File;
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

export const Image = (props: ImageProps) => {
	const { src, ...imageProps } = props;
	const [imageSRC, setImageSRC] = useState<string>();

	useEffect(() => {
		if (typeof props.src === 'string') {
			setImageSRC(props.src);
		} else {
			readFileURL(props.src, setImageSRC);
		}
	}, [props.src]);

	return <img {...imageProps} src={imageSRC} />;
};
