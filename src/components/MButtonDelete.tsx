import { PopconfirmProps } from 'antd';
import React from 'react';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MPopconfirm from './MPopconfirm';

interface MButtonDeleteProps extends PopconfirmProps {
	onClick?: React.MouseEventHandler<HTMLElement>;
	loading?: boolean;
}

const MButtonDelete: React.FC<MButtonDeleteProps> = (props) => {
	const { onConfirm, loading, ...rest } = props;
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
				tooltip='Delete'
				type='primary'
				style={{ backgroundColor: 'red' }}
				loading={loading}
			>
				<FontAwesomeIcon icon={faTrash} />
			</MButton>
		</MPopconfirm>
	);
};

export default MButtonDelete;
