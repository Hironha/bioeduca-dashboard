import styled, { css } from 'styled-components';
import { Typography, Row, Col } from 'antd';
import { AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai';

const passwodIconStyles = css`
	cursor: pointer;
`;

export const FormTitle = styled(Typography.Title)`
	text-align: center;
`;

export const FormRow = styled(Row)`
	margin: 0 16px;
`;

export const UnlockIcon = styled(AiOutlineUnlock)`
	${passwodIconStyles}
`;

export const LockIcon = styled(AiOutlineLock)`
	${passwodIconStyles}
`;

export const FormContainer = styled.div`
	display: flex;
	align-self: stretch;
	flex-direction: column;
	justify-content: space-around;

	padding: 16px 12px;
`;

export const FormActionsCol = styled(Col)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;
