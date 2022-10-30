import styled from 'styled-components';
import { Space } from 'antd';
import { Image } from './components/Image';

export const SelectedImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	padding: 16px;
	width: 160px;
	height: 140px;
	border-radius: ${(props) => props.theme.border.radius};
	box-shadow: ${(props) => props.theme.boxShadow};
	border: 1px lightgray solid;
	cursor: pointer;
`;

export const ImagesSelectorContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const SelectedImage = styled(Image)`
	padding: 12px;
	max-height: 100%;
	object-fit: contain;
	object-position: center;
	max-width: 100%;
	border-radius: 15px;
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
	top: 6px;
	right: 6px;
`;

export const SelectedImagesSpacer = styled(Space).attrs(() => ({
	direction: 'horizontal',
	wrap: true,
	size: 'middle',
}))`
	width: 100%;
`;
