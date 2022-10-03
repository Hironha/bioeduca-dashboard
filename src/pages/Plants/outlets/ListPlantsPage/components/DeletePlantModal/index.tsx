import { Modal, Typography, Button, type ModalProps } from 'antd';
import { ModalTitle, ModalFooterContainer } from './styles';

type DeletePlantModalProps = Omit<
	ModalProps,
	'onOk' | 'footer' | 'okButtonProps' | 'cancelButtonProps'
> & {
	loading?: boolean;
	plantPopularName?: string;
	onConfirmDelete: () => void;
};

export const DeletePlantModal = ({
	loading,
	plantPopularName,
	onConfirmDelete,
	...modalProps
}: DeletePlantModalProps) => {
	return (
		<Modal {...modalProps} footer={null}>
			{plantPopularName && <ModalTitle>Excluir {plantPopularName}</ModalTitle>}

			<Typography.Text>
				A exclusão da planta resultará na invalidação da leitura dos QR's code gerados para essa
				planta e nas exlcusão das imagens da mesma salvas no banco de dados.
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
