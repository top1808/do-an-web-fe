import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MTitle from '@/components/MTitle';
import { Form, Input } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login, loginFailed } from '@/redux/reducers/authReducer';

import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { FormLogin } from '@/models/authModel';

const AdminLogin = () => {
	const params = useSearchParams();
	const messageError = params.get('error');

	const accountUser: FormLogin = JSON.parse(localStorage.getItem('accountUser') || '{}');

	const dispatch = useAppDispatch();

	const { auth } = useAppSelector((state) => state);

	const handleClickLogin = (data: FormLogin) => {
		dispatch(login(data));
	};

	useEffect(() => {
		if (messageError) {
			toast.error(messageError);
		}
	}, [messageError]);

	useEffect(() => {
		dispatch(loginFailed(''));
	}, [dispatch]);

	return (
		<div className='sm:w-full md:w-2/3 lg:w-1/3 2xl:w-1/4 bg-white p-10 rounded-lg '>
			<MTitle className='text-center'>Login</MTitle>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={handleClickLogin}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='m-12'
			>
				<Form.Item<FormLogin>
					label='Username'
					name='username'
					labelAlign='left'
					initialValue={accountUser?.username || ''}
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FormLogin>
					label='Password'
					name='password'
					labelAlign='left'
					rules={[{ required: true, message: 'Please input your password!' }]}
					initialValue={accountUser?.password || ''}
				>
					<Input.Password />
				</Form.Item>
				<div className='flex justify-between'>
					<Form.Item<FormLogin>
						name='remember'
						valuePropName='checked'
						className='2xl:w-1/2 sm:w10 md:w-1/2'
					>
						<MCheckbox>Remember me</MCheckbox>
					</Form.Item>

					<Link
						href={'/'}
						className='text-blue-600 leading-8 h-8'
					>
						Forgot password ?
					</Link>
				</div>

				<Form.Item
					name={'login'}
					className='flex justify-center'
				>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
						loading={auth.logging}
					>
						Log in
					</MButton>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AdminLogin;
