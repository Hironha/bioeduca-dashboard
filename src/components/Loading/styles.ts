import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.span<{ size: string }>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid ${(props) => props.theme.colors.primary};
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: ${rotation} 1s linear infinite;
`;
