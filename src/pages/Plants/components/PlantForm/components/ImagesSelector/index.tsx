import { useRef, useState, useEffect } from 'react';
import { Tooltip } from 'antd';

import { ImageSelector } from '@components/ImageSelector';
import {
	SelectedImageContainer,
	SelectedImageName,
	ImagesSelectorContainer,
	DeleteIcon,
	TooltipText,
} from './styles';

import { imageSelectorHelpers } from './utils/imageSelectorHelpers';

type Image = {
	key: string;
	file: File;
};

export type ImagesSelectorProps = {
	className?: string;
	value?: File[];
	onChange?: (value?: File[]) => void;
	maxImages?: number;
};

export const ImagesSelector = ({
	className,
	value,
	maxImages = 5,
	onChange,
}: ImagesSelectorProps) => {
	const onChangeRef = useRef(onChange);
	const [imagesValue, setImagesValue] = useState<Image[]>(() => {
		if (value) return value.map((file) => ({ key: imageSelectorHelpers.generateKey(file), file }));
		return [];
	});

	const addImage = (file: File | null) => {
		if (file) {
			const image: Image = { key: imageSelectorHelpers.generateKey(file), file };
			setImagesValue((prevState) => prevState.concat(image));
		}
	};

	const createRemoveImageHandler = (key: string) => {
		return () => {
			setImagesValue((prevState) => prevState.filter((image) => image.key !== key));
		};
	};

	useEffect(() => {
		const onChange = onChangeRef.current;
		if (onChange) {
			onChange(imagesValue.map((value) => value.file));
		}
	}, [imagesValue]);

	return (
		<ImagesSelectorContainer className={className}>
			{imagesValue.map((image) => (
				<SelectedImageContainer key={image.key}>
					<SelectedImageName>{image.file.name}</SelectedImageName>
					<Tooltip title={<TooltipText>Remover imagem</TooltipText>}>
						<DeleteIcon onClick={createRemoveImageHandler(image.key)} />
					</Tooltip>
				</SelectedImageContainer>
			))}
			{imagesValue.length < maxImages && <ImageSelector onChange={addImage} clearOnChange />}
		</ImagesSelectorContainer>
	);
};
