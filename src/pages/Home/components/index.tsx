import { QuickAccess } from './QuickAccess';

import { Content } from '@components/Content';

export const Home = () => {
	return (
		<Content.Container>
			<QuickAccess />
			<Content.Body>
				<Content.Header level={3}>Últimas plantas inseridas</Content.Header>
			</Content.Body>
		</Content.Container>
	);
};
