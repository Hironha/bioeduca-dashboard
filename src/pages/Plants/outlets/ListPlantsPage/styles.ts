import styled from "styled-components";
import { Link } from 'react-router-dom';

export const RedirectLink = styled(Link)`
	color: ${(props) => props.theme.colors.success} !important;
	font-weight: bold;
`;