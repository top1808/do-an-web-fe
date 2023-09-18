import React, { ReactNode } from 'react';
import Title, { TitleProps } from 'antd/es/typography/Title';

interface MTitleProps extends TitleProps {
	children?: ReactNode;
}

const MTitle: React.FC<MTitleProps> = (props) => {
	const { children, ...rest } = props;
	return <Title {...rest}>{children}</Title>;
};

export default MTitle;
