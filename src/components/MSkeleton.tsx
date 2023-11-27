import React, { ReactNode } from 'react';
import { Skeleton, SkeletonProps } from 'antd';

interface MSkeletonProps extends SkeletonProps {
	children?: ReactNode;
}

const MSkeleton: React.FC<MSkeletonProps> = (props) => {
	const { children, ...rest } = props;
	return <Skeleton {...rest}>{children}</Skeleton>;
};

export default MSkeleton;
