import React, { ReactNode } from 'react';
import { Tabs, TabsProps } from 'antd';

interface MTabsProps extends TabsProps {
	children?: ReactNode;
}

const MTabs: React.FC<MTabsProps> = (props) => {
	const { children, ...rest } = props;
	return <Tabs {...rest}>{children}</Tabs>;
};

export default MTabs;
