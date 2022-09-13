import styled from 'styled-components';
import { Typography } from 'antd';

export const ForgotPasswordText = styled(Typography.Text)`
	color: ${(props) => props.theme.colors.primary};

	&:hover {
		text-decoration: underline;
	}
`;
