import styled from 'styled-components';

export const LoginContainer = styled.div`
	--margin-bottom: 85px;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: calc(100vh - var(--margin-bottom));
	margin: 0 0 var(--margin-bottom) 0;
	padding: 0;
`;

export const LoginPageContainer = styled.main`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 36px;

	padding: 32px;
	max-width: 720px;
  height: 450px;
	border-radius: ${(props) => props.theme.border.radius};
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const BannerImage = styled.img`
	margin: 24px;
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
`;

export const LoginDivider = styled.div`
	align-self: stretch;
	height: 100%;
	width: 2px;
	border-radius: ${(props) => props.theme.border.radius};
  border: 1px ${(props) => `${props.theme.colors.primary}55`} solid;
`;
