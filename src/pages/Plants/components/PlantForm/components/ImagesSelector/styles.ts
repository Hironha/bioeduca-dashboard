import styled from 'styled-components';
import { Space } from 'antd';
import { Image } from './components/Image';

export const SelectedImageContainer = styled.div`
	position: relative;
	padding: 16px;
	border-radius: ${(props) => props.theme.border.radius};
	box-shadow: ${(props) => props.theme.boxShadow};
	border: 1px lightgray solid;
`;

export const ImagesSelectorContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const SelectedImage = styled(Image)`
	padding: 12px;
	width: 120px;
	height: 120px;
	border-radius: ${(props) => props.theme.border.radius};
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

export const DeleteIconContainer = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
`;

export const SelectedImagesSpacer = styled(Space).attrs(() => ({
	direction: 'horizontal',
	wrap: true,
	size: 'middle',
}))`
	width: 100%;
`;
