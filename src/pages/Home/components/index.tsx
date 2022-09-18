import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { Container, ButtonContainer } from './styles';

export const Home = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<ButtonContainer>
				<Button type="primary" onClick={() => navigate('/signup')}>
					Criar conta
				</Button>
				<Button type="primary" onClick={() => navigate('/signup')}>
					Criar conta
				</Button>
			</ButtonContainer>
		</Container>
	);
};
