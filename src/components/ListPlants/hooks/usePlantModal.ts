import { useState } from 'react';

import { type IPlantPreview } from '@interfaces/models/plant';

enum PlantModal {
	VIEW_PLANT,
	QR_CODE,
}

export const usePlantModal = () => {
	const [modalType, setModalType] = useState<PlantModal | null>(null);
	const [plantPreview, setPlantPreview] = useState<IPlantPreview | null>(null);

	const showQRCodeModal = modalType === PlantModal.QR_CODE && plantPreview !== null;

	const showViewPlantModal = modalType === PlantModal.VIEW_PLANT && plantPreview !== null;

	const setQRCodeModal = (plantPreview: IPlantPreview) => {
		setModalType(PlantModal.QR_CODE);
		setPlantPreview(plantPreview);
	};

	const setViewPlantModal = (plantPreview: IPlantPreview) => {
		setModalType(PlantModal.VIEW_PLANT);
		setPlantPreview(plantPreview);
	};

	const closeModal = () => {
		setModalType(null);
		setPlantPreview(null);
	};

	return {
		plantPreview,
		showQRCodeModal,
		showViewPlantModal,
		setQRCodeModal,
		setViewPlantModal,
		closeModal,
	};
};
