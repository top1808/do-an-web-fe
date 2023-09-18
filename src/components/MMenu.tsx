import React, { ReactNode } from 'react';
import { Menu, MenuProps } from 'antd';

interface MMenuProps extends MenuProps {
	children?: ReactNode;
}

const MMenu: React.FC<MMenuProps> = (props) => {
	const { children, ...rest } = props;
	return <Menu {...rest}>{children}</Menu>;
};

export default MMenu;
