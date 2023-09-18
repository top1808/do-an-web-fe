import React, { ReactNode } from 'react';
import { Avatar, AvatarProps } from 'antd';

interface MAvatarProps extends AvatarProps {
	children?: ReactNode;
}

const MAvatar: React.FC<MAvatarProps> = (props) => {
	const { children, ...rest } = props;
	return <Avatar {...rest}>{children}</Avatar>;
};

export default MAvatar;
