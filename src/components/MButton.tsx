'use client';

import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
import { useRouter } from 'next/navigation';

interface MButtonProps extends ButtonProps {
	children?: ReactNode;
	link?: string;
}

const MButton: React.FC<MButtonProps> = (props) => {
	const router = useRouter();
	const { children, link, ...rest } = props;
	return (
		<Button
			{...rest}
			onClick={link ? () => router.push(link) : rest.onClick}
		>
			{children}
		</Button>
	);
};

export default MButton;
