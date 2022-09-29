import { useRef, useState, useEffect } from 'react';
import { Modal, Tooltip } from 'antd';
import { useTheme } from 'styled-components';
import { BsTrash } from 'react-icons/bs';

import { ImageSelector } from '@components/ImageSelector';
import {
	SelectedImageContainer,
	SelectedImageName,
	ImagesSelectorContainer,
	TooltipText,
	ModalImage,
	ModalImageContainer,
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
	const { colors } = useTheme();
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
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

	const createViewImageHandler = (imageFile: File) => {
		return () => {
			imageSelectorHelpers.readFileURL(imageFile, (url) => {
				setSelectedImageURL(url);
			});
		};
	};

	const handleModalCancel = () => {
		setSelectedImageURL(null);
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
					<SelectedImageName onClick={createViewImageHandler(image.file)}>
						{image.file.name}
					</SelectedImageName>

					<Tooltip title={<TooltipText>Remover imagem</TooltipText>}>
						<BsTrash
							size={20}
							style={{ cursor: 'pointer' }}
							color={colors.error}
							onClick={createRemoveImageHandler(image.key)}
						/>
					</Tooltip>
				</SelectedImageContainer>
			))}
			{imagesValue.length < maxImages && <ImageSelector onChange={addImage} clearOnChange />}

			<Modal
				centered
				destroyOnClose
				visible={selectedImageURL !== null}
				footer={null}
				onCancel={handleModalCancel}
			>
				{selectedImageURL !== null && (
					<ModalImageContainer>
						<ModalImage src={selectedImageURL} />
					</ModalImageContainer>
				)}
			</Modal>
		</ImagesSelectorContainer>
	);
};
