import React, { ReactNode } from 'react';
import { Typography } from 'antd';
import { ParagraphProps } from 'antd/es/typography/Paragraph';

const { Paragraph } = Typography;

interface MParagraphProps extends ParagraphProps {
	children?: ReactNode;
}

const MParagraph: React.FC<MParagraphProps> = (props) => {
	const { children, ...rest } = props;
	return <Paragraph {...rest}>{children}</Paragraph>;
};

export default MParagraph;
