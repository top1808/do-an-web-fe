import React, { ReactNode } from 'react';
import { Input, InputProps } from 'antd';

interface MInputProps extends InputProps {
	children?: ReactNode;
}

const MInput: React.FC<MInputProps> = (props) => {
	const { children, ...rest } = props;
	return (
		<Input
			showCount
			maxLength={100}
			{...rest}
		>
			{children}
		</Input>
	);
};

export default MInput;
