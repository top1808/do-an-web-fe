import { PopconfirmProps } from 'antd';
import React from 'react';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MPopconfirm from './MPopconfirm';

interface MButtonDeleteProps extends PopconfirmProps {
	onClick?: React.MouseEventHandler<HTMLElement>;
}

const MButtonDelete: React.FC<MButtonDeleteProps> = (props) => {
	const { onConfirm, ...rest } = props;
	return (
		<MPopconfirm
			description='Are you sure to delete?'
			onConfirm={onConfirm}
			okText='Yes'
			cancelText='No'
			placement='bottom'
			{...rest}
		>
			<MButton
				type='primary'
				style={{ backgroundColor: 'red' }}
			>
				<FontAwesomeIcon icon={faTrash} />
			</MButton>
		</MPopconfirm>
	);
};

export default MButtonDelete;
