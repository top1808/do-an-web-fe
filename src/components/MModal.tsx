import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';

interface MModalProps extends ModalProps {
	children?: ReactNode;
}

const MModal: React.FC<MModalProps> = (props) => {
	const { children, ...rest } = props;
	return <Modal {...rest}>{children}</Modal>;
};

export default MModal;
