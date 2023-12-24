'use client';

import React, { ReactNode } from 'react';
import { Button, ButtonProps, Tooltip } from 'antd';
import { useRouter } from 'next-nprogress-bar';

interface MButtonProps extends ButtonProps {
	children?: ReactNode;
	link?: string;
	tooltip?: string;
	isGoBack?: boolean;
}

const MButton: React.FC<MButtonProps> = (props) => {
	const router = useRouter();
	const { children, link, isGoBack, tooltip, ...rest } = props;
	return (
		<Tooltip title={tooltip}>
			<Button
				{...rest}
				onClick={isGoBack ? () => router.back() : link ? () => router.push(link) : rest.onClick}
			>
				{children}
			</Button>
		</Tooltip>
	);
};

export default MButton;
