import { useEffect, useState } from 'react';
import { Modal, Checkbox, type ModalProps, Col } from 'antd';
import { Loading } from '@components/Loading';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

import {
	LoadingContainer,
	AdditionalInformationsContainer,
	AddButton,
	PlantInformationsRow,
} from './styles';

import { type CheckboxValueType } from 'antd/lib/checkbox/Group';

type AdditionalInformationsModalProps = Omit<ModalProps, 'footer'> & {
	initialSelected?: IPlantInformation[];
	plantInformations: IPlantInformation[];
	loading?: boolean;
	onAddInformations: (selectedInformations: IPlantInformation[]) => void;
};

export const AdditionalInformationsModal = ({
	initialSelected,
	loading,
	plantInformations,
	onAddInformations,
	...modalProps
}: AdditionalInformationsModalProps) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleOptionSelect = (options: CheckboxValueType[]) => {
		setSelectedOptions(options as string[]);
	};

	const handleAddInformations = () => {
		const selectedPlantInformations = plantInformations.filter(({ field_name }) => {
			return selectedOptions.includes(field_name);
		});
		onAddInformations(selectedPlantInformations);
	};

	useEffect(() => {
		if (modalProps.visible) {
			setSelectedOptions(initialSelected?.map(({ field_name }) => field_name) ?? []);
		} else {
			setSelectedOptions([]);
		}
	}, [modalProps.visible, initialSelected]);

	return (
		<Modal {...modalProps} footer={null}>
			{loading ? (
				<LoadingContainer>
					<Loading size="medium" />
				</LoadingContainer>
			) : (
				<AdditionalInformationsContainer>
					<Checkbox.Group value={selectedOptions} onChange={handleOptionSelect}>
						<PlantInformationsRow gutter={[16, 16]}>
							{plantInformations.map((plantInformation) => (
								<Col span={8} key={plantInformation.id}>
									<Checkbox value={plantInformation.field_name}>
										{plantInformation.field_name}
									</Checkbox>
								</Col>
							))}
						</PlantInformationsRow>
					</Checkbox.Group>
					<AddButton type="primary" onClick={handleAddInformations}>
						Adicionar informações
					</AddButton>
				</AdditionalInformationsContainer>
			)}
		</Modal>
	);
};
