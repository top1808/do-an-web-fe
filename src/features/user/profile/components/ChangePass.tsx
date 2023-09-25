'use  client';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import MTitle from '@/components/MTitle';
import { Form } from 'antd';
import React from 'react';

const ChangePass = () => {
	return (
		<div>
			<MTitle level={3}>Đổi mật khẩu</MTitle>
			<Form>
				<Form.Item name={'username'}>
					<MInput
						placeholder='usename'
						disabled
					/>
				</Form.Item>
				<Form.Item name={'newpass'}>
					<MInput placeholder='Nhập mật khẩu mới' />
				</Form.Item>
				<Form.Item name={'renewpass'}>
					<MInput placeholder='Nhập lại mật khẩu mới' />
				</Form.Item>
			</Form>
			<MButton htmlType='submit'>Thay đổi mật khẩu</MButton>
		</div>
	);
};

export default ChangePass;
