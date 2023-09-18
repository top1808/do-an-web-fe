import React, { ReactNode } from 'react';
import { Badge, BadgeProps } from 'antd';

interface MBadgeProps extends BadgeProps {
	children?: ReactNode;
}

const MBadge: React.FC<MBadgeProps> = (props) => {
	const { children, ...rest } = props;
	return <Badge {...rest}>{children}</Badge>;
};

export default MBadge;
