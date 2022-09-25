import { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';

import {
	LabelContainer,
	ImageInput,
	FileUploadIcon,
	ErrorMessage,
	ImageInputLabel,
} from './styles';

export type ImageSelectorProps = {
	className?: string;
	label?: string;
	value?: File;
	clearOnChange?: boolean;
	onChange?: (image: File | null) => void | Promise<void>;
};

export const ImageSelector = ({
	className,
	value,
	label = 'Escolher arquivo',
	clearOnChange,
	onChange,
}: ImageSelectorProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const onChangeRef = useRef(onChange);
	const [image, setImage] = useState<File | null>(value ?? null);
	const [errMessage, setErrMessage] = useState<string | null>(null);

	const validMimetypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

	const validateFileMimetype = (file: File) => {
		return validMimetypes.includes(file.type);
	};

	const handleSelectImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const files = event.target.files;
		if (!files) return;
		const file = files.item(0);
		if (!file) return;
		const isMimetypeValid = validateFileMimetype(file);
		if (isMimetypeValid) {
			setImage(file);
			setErrMessage(null);
		} else {
			setErrMessage('Tipo de imagem inválido');
		}
	};

	useEffect(() => {
		const onChange = onChangeRef.current;
		if (onChange) {
			onChange(image);
		}
	}, [image]);

	useEffect(() => {
		if (clearOnChange) {
			setImage(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	}, [image, clearOnChange]);

	return (
		<LabelContainer className={className}>
			<ImageInput
				id="imageSelector"
				type="file"
				accept={validMimetypes.join(', ')}
				onChange={handleImageChange}
				ref={fileInputRef}
			/>
			<Button
				type="primary"
				htmlType="button"
				icon={<FileUploadIcon />}
				onClick={handleSelectImage}
			>
				<ImageInputLabel>{label}</ImageInputLabel>
			</Button>
			{errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
		</LabelContainer>
	);
};
