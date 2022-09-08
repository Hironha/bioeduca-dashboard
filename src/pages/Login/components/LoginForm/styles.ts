import styled, { css } from 'styled-components';
import { Typography, Row, Col } from 'antd';
import { AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai';

const passwodIconStyles = css`
	cursor: pointer;
`;

export const LoginFormTitle = styled(Typography.Title)`
	text-align: center;
`;

export const LoginFormRow = styled(Row)`
	margin: 0 16px;
`;

export const LoginActionsCol = styled(Col)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;

export const UnlockIcon = styled(AiOutlineUnlock)`
	${passwodIconStyles}
`;

export const LockIcon = styled(AiOutlineLock)`
	${passwodIconStyles}
`;
