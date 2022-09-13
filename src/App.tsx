import { ThemeProvider } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import { AuthProvider } from '@providers/AuthProvider';
import { GlobalStyle, theme } from './GlobalStyle';
import { PageRoutes } from './pages/routes';

initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ConfigProvider locale={ptBR}>
				<BrowserRouter>
					<AuthProvider>
						<PageRoutes />
					</AuthProvider>
				</BrowserRouter>
			</ConfigProvider>
		</ThemeProvider>
	);
}

export default App;
