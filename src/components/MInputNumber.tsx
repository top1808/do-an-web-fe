import React, { ReactNode } from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';

interface MInputNumberProps extends InputNumberProps {
	children?: ReactNode;
}

const MInputNumber: React.FC<MInputNumberProps> = (props) => {
	const { children, ...rest } = props;
	return (
		<InputNumber
			maxLength={10}
			formatter={(value) => handleFormatterInputNumber(Number(value))}
			parser={(value) => handleParserInputNumber(String(value))}
			{...rest}
		>
			{children}
		</InputNumber>
	);
};

export default MInputNumber;
