import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  &:root{
    font-family: 'Poppins', sans-serif !important;
  }

  body{
    font-family: 'Poppins', sans-serif !important;
  }
`;

export const theme = {
	colors: {
		primary: '#539229',
		success: '#1a73e8',
		warning: '#ffbd2e',
		error: '#ff5f56',
	},
	border: {
		radius: '5px',
	},
};
