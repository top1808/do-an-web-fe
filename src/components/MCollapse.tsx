import React, { ReactNode } from 'react';
import { Collapse, CollapseProps } from 'antd';

interface MCollapseProps extends CollapseProps {
	children?: ReactNode;
}

const MCollapse: React.FC<MCollapseProps> = (props) => {
	const { children, ...rest } = props;
	return <Collapse {...rest}>{children}</Collapse>;
};

export default MCollapse;
