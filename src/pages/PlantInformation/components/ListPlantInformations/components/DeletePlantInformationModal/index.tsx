import { Modal, Typography, Button, type ModalProps } from 'antd';
import { ModalTitle, ModalFooterContainer } from './styles';

type DeletePlantInformationModalProps = Omit<
	ModalProps,
	'onOk' | 'footer' | 'okButtonProps' | 'cancelButtonProps'
> & {
	loading?: boolean;
	plantInformationName?: string;
	onConfirmDelete: () => void;
};

export const DeletePlantInformationModal = ({
	loading,
	plantInformationName,
	onConfirmDelete,
	...modalProps
}: DeletePlantInformationModalProps) => {
	return (
		<Modal {...modalProps} footer={null}>
			{plantInformationName && <ModalTitle>Excluir {plantInformationName}</ModalTitle>}
			<Typography.Text>
				A exclusão da informação resultará na exclusão dessa informação em todas as plantas que
				possuem ela
			</Typography.Text>

			<ModalFooterContainer>
				<Button ghost danger type="primary" disabled={loading} onClick={modalProps.onCancel}>
					Cancelar
				</Button>
				<Button loading={loading} disabled={loading} type="primary" onClick={onConfirmDelete}>
					Confirmar
				</Button>
			</ModalFooterContainer>
		</Modal>
	);
};
