import { Modal, type ModalProps } from 'antd';
import QRCode from 'qrcode.react';

import { ModalTitle, QRCodeContainer } from './styles';

export type QRCodeModalProps = Omit<ModalProps, 'footer' | 'children'> & {
	popularName?: string;
	plantId?: string;
};

export const QRCodeModal = ({ popularName, plantId, visible, ...props }: QRCodeModalProps) => {
	const showContent = plantId != null && popularName != null;
	const isVisible = visible && showContent;

	return (
		<Modal {...props} visible={isVisible} footer={null}>
			{showContent && (
				<>
					<ModalTitle>QR Code para {popularName}</ModalTitle>

					<QRCodeContainer>
						<QRCode value={plantId} renderAs="canvas" />
					</QRCodeContainer>
				</>
			)}
		</Modal>
	);
};
