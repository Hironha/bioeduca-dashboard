import styled, { css } from 'styled-components';
import { Typography, Row, Col } from 'antd';
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
	flex-direction: column;
	justify-content: space-around;
`;

export const FormActionsCol = styled(Col)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;
