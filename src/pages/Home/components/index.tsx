import { QuickAccess } from './QuickAccess';

import { Content } from '@components/Content';
import { ListPlants } from '@components/ListPlants';

export const Home = () => {
	return (
		<Content.Container>
			<QuickAccess />
			<Content.Body>
				<Content.Header level={3}>Últimas plantas inseridas</Content.Header>
				<ListPlants limit={6} perPage={6} />
			</Content.Body>
		</Content.Container>
	);
};
