import { type ArgsProps } from 'antd/lib/notification';

export type NotificationCreator = (args?: Partial<ArgsProps>) => ArgsProps;
