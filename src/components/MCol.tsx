import React, { ReactNode } from 'react';
import { Col, ColProps } from 'antd';

interface MColProps extends ColProps {
	children?: ReactNode;
}

const MCol: React.FC<MColProps> = (props) => {
	const { children, ...rest } = props;
	return <Col {...rest}>{children}</Col>;
};

export default MCol;
