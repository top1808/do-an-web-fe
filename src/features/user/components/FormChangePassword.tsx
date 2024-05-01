import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { ChangePasswordModel } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changingPasswordUser, getUserState } from '@/redux/reducers/userReducer';
import { Form, Input } from 'antd';
import { useParams } from 'next/navigation';
import React from 'react';

interface FormChangePasswordProps {}

const FormChangePassword = (props: FormChangePasswordProps) => {
	const user = useAppSelector(getUserState);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onFinish = (data: ChangePasswordModel) => {
		dispatch(
			changingPasswordUser({
				id: id as string,
				...data,
			}),
		);
	};
	return (
		<Form onFinish={onFinish}>
			<MRow
				gutter={8}
				justify='end'
			>
				<MCol
					xs={24}
					md={8}
				>
					<Form.Item
						name={'password'}
						rules={[{ required: true }]}
						hasFeedback
					>
						<Input.Password placeholder='Nhập mật khẩu hiện tại' />
					</Form.Item>
				</MCol>
				<MCol
					xs={24}
					md={8}
				>
					<Form.Item
						name={'newPassword'}
						rules={[{ required: true }]}
						hasFeedback
					>
						<Input.Password placeholder='Nhập mật khẩu mới' />
					</Form.Item>
				</MCol>
				<MCol
					xs={24}
					md={8}
				>
					<Form.Item
						name={'confirmPassword'}
						dependencies={['newPassword']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your new password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('The new password that you entered do not match!'));
								},
							}),
						]}
					>
						<Input.Password placeholder='Nhập lại mật khẩu mới' />
					</Form.Item>
				</MCol>
			</MRow>

			<MRow
				gutter={8}
				justify='end'
			>
				<MCol>
					<MButton
						type='primary'
						className='bg-gray-400'
						isGoBack
					>
						Back
					</MButton>
				</MCol>
				<MCol>
					<MButton
						htmlType='submit'
						type='primary'
						loading={user.loading}
					>
						Thay đổi mật khẩu
					</MButton>
				</MCol>
			</MRow>
		</Form>
	);
};

export default FormChangePassword;
