import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import styled from 'styled-components';

export const DeletePlantInformationAlert = styled(Alert)`
	margin: 12px 0;
`;

export const CreatePlantInformationLink = styled(Link)`
	& > span {
		color: ${(props) => props.theme.colors.success};
		font-weight: bold;
		text-decoration: underline;
	}
`;
