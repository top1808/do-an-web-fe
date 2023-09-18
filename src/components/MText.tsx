import React, { ReactNode } from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';

const { Text } = Typography;

interface MTextProps extends TextProps {
	children?: ReactNode;
}

const MText: React.FC<MTextProps> = (props) => {
	const { children, ...rest } = props;
	return <Text {...rest}>{children}</Text>;
};

export default MText;
