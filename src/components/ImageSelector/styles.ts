import styled from 'styled-components';
import { AiOutlineUpload } from 'react-icons/ai';

export const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`;

export const ImageInput = styled.input.attrs(() => ({ hidden: true }))`
	display: none;
`;

export const ImageInputLabel = styled.span`
	margin-left: 12px;
`;

export const ErrorMessage = styled.span`
	color: ${(props) => props.theme.colors.error};
`;

export const FileUploadIcon = styled(AiOutlineUpload).attrs(() => ({
	size: 16,
	color: 'white',
}))``;
