import React, { ReactNode } from 'react';
import { Popconfirm, PopconfirmProps } from 'antd';

interface MPopconfirmProps extends PopconfirmProps {
	children?: ReactNode;
}

const MPopconfirm: React.FC<MPopconfirmProps> = (props) => {
	const { children, ...rest } = props;
	return <Popconfirm {...rest}>{children}</Popconfirm>;
};

export default MPopconfirm;
