import { useRef, useState, useEffect, useCallback } from 'react';
import { Modal, Tooltip } from 'antd';
import { useTheme } from 'styled-components';
import { BsTrash } from 'react-icons/bs';

import { ImageSelector } from '@components/ImageSelector';
import {
	SelectedImageContainer,
	SelectedImagesSpacer,
	TooltipText,
	ModalImage,
	ModalImageContainer,
	SelectedImage,
	DeleteIconContainer,
	ImagesSelectorContainer,
} from './styles';

import { imageSelectorHelpers } from './utils/imageSelectorHelpers';

type ImageSRC = File | string;

type ImageData = {
	key: string;
	src: ImageSRC;
};

export type ImagesSelectorProps = {
	className?: string;
	value?: ImageSRC[];
	onChange?: (value?: ImageSRC[]) => void;
	maxImages?: number;
};

export const ImagesSelector = ({
	className,
	value,
	maxImages = 5,
	onChange,
}: ImagesSelectorProps) => {
	const { colors } = useTheme();
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
	const [imagesValue, setImagesValue] = useState<ImageData[]>(() => {
		if (!value) return [];
		return value.map((src) => ({
			key: imageSelectorHelpers.generateKey(src),
			src,
		}));
	});

	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const addImage = useCallback((file: File | null) => {
		if (file) {
			const image: ImageData = { key: imageSelectorHelpers.generateKey(file), src: file };
			setImagesValue((prevState) => prevState.concat(image));
		}
	}, []);

	const handleRemoveImage = useCallback((key: string) => {
		setImagesValue((prevState) => prevState.filter((image) => image.key !== key));
	}, []);

	const handleViewImage = (imageSRC: ImageSRC) => {
		if (typeof imageSRC === 'string') {
			setSelectedImageURL(imageSRC);
		} else {
			imageSelectorHelpers.readFileURL(imageSRC, (url) => {
				setSelectedImageURL(url);
			});
		}
	};

	useEffect(() => {
		const onChange = onChangeRef.current;
		if (onChange) {
			onChange(imagesValue.map((value) => value.src));
		}
	}, [imagesValue]);

	return (
		<ImagesSelectorContainer>
			<SelectedImagesSpacer className={className}>
				{imagesValue.map((image, index) => (
					<SelectedImageContainer key={image.key}>
						<SelectedImage
							src={image.src}
							alt={typeof image.src === 'string' ? `${index}` : image.src.name}
							onClick={() => handleViewImage(image.src)}
						/>

						<DeleteIconContainer>
							<Tooltip title={<TooltipText>Remover imagem</TooltipText>}>
								<BsTrash
									size={20}
									style={{ cursor: 'pointer' }}
									color={colors.error}
									onClick={() => handleRemoveImage(image.key)}
								/>
							</Tooltip>
						</DeleteIconContainer>
					</SelectedImageContainer>
				))}
			</SelectedImagesSpacer>

			<Modal
				centered
				destroyOnClose
				visible={selectedImageURL !== null}
				footer={null}
				onCancel={() => setSelectedImageURL(null)}
			>
				{selectedImageURL !== null && (
					<ModalImageContainer>
						<ModalImage src={selectedImageURL} />
					</ModalImageContainer>
				)}
			</Modal>

			{imagesValue.length < maxImages && <ImageSelector onChange={addImage} clearOnChange />}
		</ImagesSelectorContainer>
	);
};
