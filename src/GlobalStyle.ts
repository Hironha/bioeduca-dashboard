import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  &:root{
    font-family: 'Poppins', sans-serif !important;
  }

	* {
		padding: 0;
		margin: 0;	
	}

	*, *::before, *::after {
 		box-sizing: border-box;
	}

	html {
		height: 100%;
	}
	
  body{
    font-family: 'Poppins', sans-serif !important;
		height: 100%;
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
	boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
};
