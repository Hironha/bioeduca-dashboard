import styled from 'styled-components';

export const LoginContainer = styled.div`
	--padding-bottom: 70px;

	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => `${props.theme.colors.primary}D7`};

	width: 100%;
	height: 100vh;
	padding: 0 0 var(--padding-bottom) 0;
`;

export const LoginPageContainer = styled.main`
	display: flex;
	flex-direction: row;
	background-color: white;
	gap: 36px;

	padding: 18px;
	width: 700px;
	max-height: 500px;
	border-radius: ${(props) => props.theme.border.radius};
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const OutletContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
`;

export const ImageContainer = styled.div`
	display: flex;
	width: 300px;
	justify-content: center;
	align-items: center;
`;

export const BannerImage = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
`;
