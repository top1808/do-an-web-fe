import React, { ReactNode } from 'react';
import { Image, ImageProps } from 'antd';

interface MImageProps extends ImageProps {
	children?: ReactNode;
}

const MImage: React.FC<MImageProps> = (props) => {
	const { children, ...rest } = props;
	return <Image {...rest}>{children}</Image>;
};

export default MImage;
