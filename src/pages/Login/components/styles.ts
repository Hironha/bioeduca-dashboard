import styled, { css } from 'styled-components';
import { Typography, Row, Space } from 'antd';
import { AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai';

const passwodIconStyles = css`
	cursor: pointer;
`;

export const FormTitle = styled(Typography.Title)`
	text-align: center;
`;

export const FormRow = styled(Row)``;

export const UnlockIcon = styled(AiOutlineUnlock)`
	${passwodIconStyles}
`;

export const LockIcon = styled(AiOutlineLock)`
	${passwodIconStyles}
`;

export const FormContainer = styled.div`
	flex: 1;
	display: flex;
	gap: 16px;
	flex-direction: column;
	justify-content: center;
`;

export const FormActionsWrapper = styled(Space)`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;
