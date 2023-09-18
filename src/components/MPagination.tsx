import React, { ReactNode } from 'react';
import { Pagination, PaginationProps } from 'antd';

interface MPaginationProps extends PaginationProps {
	children?: ReactNode;
}

const MPagination: React.FC<MPaginationProps> = (props) => {
	const { children, ...rest } = props;
	return <Pagination {...rest}>{children}</Pagination>;
};

export default MPagination;
