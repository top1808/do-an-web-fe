import React, { ReactNode } from 'react';
import { Select, SelectProps } from 'antd';

interface MSelectProps extends SelectProps {
	children?: ReactNode;
}

const MSelect: React.FC<MSelectProps> = (props) => {
	const { children, ...rest } = props;
	return <Select {...rest}>{children}</Select>;
};

export default MSelect;
