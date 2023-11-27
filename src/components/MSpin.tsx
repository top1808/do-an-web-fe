import React, { ReactNode } from 'react';
import { Spin, SpinProps } from 'antd';

interface MSpinProps extends SpinProps {
	children?: ReactNode;
}

const MSpin: React.FC<MSpinProps> = (props) => {
	const { children, ...rest } = props;
	return <Spin {...rest}>{children}</Spin>;
};

export default MSpin;
