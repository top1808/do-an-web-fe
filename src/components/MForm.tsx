import React, { ReactNode } from 'react';
import { Form, FormProps, FormItemProps } from 'antd';

interface MFormProps extends FormProps {
	children?: ReactNode;
}

interface MFormItemProps extends FormItemProps {
	children?: ReactNode;
}

const MForm1: React.FC<MFormProps> = (props) => {
	const { children, ...rest } = props;
	return <Form {...rest}>{children}</Form>;
};

const MFormItem: React.FC<MFormItemProps> = (props) => {
	const { children, ...rest } = props;
	return <Form.Item {...rest}>{children}</Form.Item>;
};

const MForm = { Form: MForm1, Item: MFormItem };

export default MForm;
