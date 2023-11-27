import React, { ReactNode } from 'react';
import { Upload, UploadProps } from 'antd';

interface MUploadProps extends UploadProps {
	children?: ReactNode;
}

const MUpload: React.FC<MUploadProps> = (props) => {
	const { children, ...rest } = props;
	return <Upload {...rest}>{children}</Upload>;
};

export default MUpload;
