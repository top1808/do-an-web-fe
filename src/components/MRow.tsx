import React, { ReactNode } from 'react';
import { Row, RowProps } from 'antd';

interface MRowProps extends RowProps {
	children?: ReactNode;
}

const MRow: React.FC<MRowProps> = (props) => {
	const { children, ...rest } = props;
	return <Row {...rest}>{children}</Row>;
};

export default MRow;
