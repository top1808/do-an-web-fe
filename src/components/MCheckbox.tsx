import React, { ReactNode } from 'react';
import { Checkbox, CheckboxProps } from 'antd';

interface MCheckboxProps extends CheckboxProps {
	children?: ReactNode;
}

const MCheckbox: React.FC<MCheckboxProps> = (props) => {
	const { children, ...rest } = props;
	return <Checkbox {...rest}>{children}</Checkbox>;
};

export default MCheckbox;
