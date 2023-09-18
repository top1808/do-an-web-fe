import React, { ReactNode } from 'react';
import { FloatButton, FloatButtonProps } from 'antd';

interface MFloatButtonProps extends FloatButtonProps {
	children?: ReactNode;
}

const MFloatButton: React.FC<MFloatButtonProps> = (props) => {
	const { children, ...rest } = props;
	return <FloatButton {...rest}>{children}</FloatButton>;
};

export default MFloatButton;
