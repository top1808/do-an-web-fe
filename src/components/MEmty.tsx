import React, { ReactNode } from 'react';
import { Empty, EmptyProps } from 'antd';

interface MEmptyProps extends EmptyProps {
	children?: ReactNode;
}

const MEmty: React.FC<MEmptyProps> = (props) => {
	const { children, ...rest } = props;
	return <Empty {...rest}>{children}</Empty>;
};

export default MEmty;
