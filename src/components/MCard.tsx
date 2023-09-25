import { Card, CardProps } from 'antd';
import React from 'react';

interface MCardProps extends CardProps {
	children?: React.ReactNode;
}

const MCard: React.FC<MCardProps> = (props) => {
	const { children, ...rest } = props;
	return <Card {...rest}>{children}</Card>;
};

export default MCard;
