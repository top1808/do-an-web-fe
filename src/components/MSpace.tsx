import React, { ReactNode } from 'react';
import { Space, SpaceProps } from 'antd';

interface MSpaceProps extends SpaceProps {
	children?: ReactNode;
}

const MSpace: React.FC<MSpaceProps> = (props) => {
	const { children, ...rest } = props;
	return <Space {...rest}>{children}</Space>;
};

export default MSpace;
