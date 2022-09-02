import { ConfigProvider, Button } from 'antd';
import { ThemeProvider } from 'styled-components';

import ptBR from 'antd/es/locale/pt_BR';
import { GlobalStyle, theme } from './GlobalStyle';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ConfigProvider locale={ptBR}>
				<GlobalStyle />
				<Button type="primary">Teste</Button>
			</ConfigProvider>
		</ThemeProvider>
	);
}

export default App;
