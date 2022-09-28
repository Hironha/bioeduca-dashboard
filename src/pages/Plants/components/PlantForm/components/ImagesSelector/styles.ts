import styled from 'styled-components';
import { Space } from 'antd';
import { BsTrash } from 'react-icons/bs';

export const SelectedImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;

	padding: 6px 12px;
	border-radius: ${(props) => props.theme.border.radius};
	border: 1px ${(props) => props.theme.colors.primary} solid;
`;

export const SelectedImageName = styled.span`
	cursor: pointer;
	color: ${(props) => props.theme.colors.success};
	&:hover {
		text-decoration: underline;
	}
`;

export const DeleteIcon = styled(BsTrash).attrs(() => ({ size: 20 }))`
	color: ${(props) => props.theme.colors.error};
	cursor: pointer;
`;

export const ModalImageContainer = styled.div`
	max-width: 700px;
	max-height: 450px;
	padding: 16px;
`;

export const ModalImage = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	object-position: center;
	border-radius: ${(props) => props.theme.border.radius};
`;

export const TooltipText = styled.span`
	font-size: 14px;
`;

export const ImagesSelectorContainer = styled(Space).attrs(() => ({
	direction: 'vertical',
	size: 'middle',
}))`
	width: 100%;
`;
