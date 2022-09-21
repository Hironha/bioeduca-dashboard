import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import styled from 'styled-components';

export const DeletePlantInformationAlert = styled(Alert)`
	margin: 12px 0;
`;

export const CreatePlantInformationLink = styled(Link)`
	color: ${(props) => props.theme.colors.success} !important;
	font-weight: bold;
`;
