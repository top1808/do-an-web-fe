import { Breadcrumb, BreadcrumbProps } from 'antd';
import React, { ReactNode } from 'react';

interface MBreadcrumbProps extends BreadcrumbProps {
	items: {
		title: string | React.ReactNode;
	}[];
}

const MBreadcrumb: React.FC<MBreadcrumbProps> = (props) => {
	const { items } = props;
	return (
		<Breadcrumb
			items={items}
			className='mb-2'
		/>
	);
};

export default MBreadcrumb;
