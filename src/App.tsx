import { ThemeProvider } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import { GlobalStyle, theme } from './GlobalStyle';
// import { PageLayout } from './components/Layout';
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
			<ConfigProvider locale={ptBR}>
				<GlobalStyle />
				<BrowserRouter>
					<PageRoutes />
				</BrowserRouter>
			</ConfigProvider>
		</ThemeProvider>
	);
}

export default App;
