import { useState } from 'react';
import { Modal, Checkbox, type ModalProps, Spin } from 'antd';

import { type IPlantInformation } from '@interfaces/models/plantInformation';

import { LoadingContainer, AdditionalInformationsContainer, AddButton } from './styles';

import { type CheckboxOptionType } from 'antd/es/checkbox';
import { type CheckboxValueType } from 'antd/lib/checkbox/Group';

type AdditionalInformationsModalProps = Omit<ModalProps, 'footer'> & {
	plantInformations: IPlantInformation[];
	loading?: boolean;
	loadingText?: string;
	onAddInformations: (selectedInformations: string[]) => void;
};

export const AdditionalInformationsModal = ({
	loading,
	plantInformations,
	loadingText = 'Carregando informações...',
	onAddInformations,
	...modalProps
}: AdditionalInformationsModalProps) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const plantInformationOptions: CheckboxOptionType[] = plantInformations.map(
		(plantInformation) => {
			return {
				label: plantInformation.field_name,
				value: plantInformation.field_name,
			};
		}
	);

	const handleOptionSelect = (options: CheckboxValueType[]) => {
		setSelectedOptions(options as string[]);
	};

	const handleAddInformations = () => {
		onAddInformations(selectedOptions);
	};

	return (
		<Modal {...modalProps} footer={null}>
			{loading ? (
				<LoadingContainer>
					<Spin spinning tip={loadingText} />
				</LoadingContainer>
			) : (
				<AdditionalInformationsContainer>
					<Checkbox.Group onChange={handleOptionSelect} options={plantInformationOptions} />
					<AddButton type="primary" onClick={handleAddInformations}>
						Adicionar informações
					</AddButton>
				</AdditionalInformationsContainer>
			)}
		</Modal>
	);
};
