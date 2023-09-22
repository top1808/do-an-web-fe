import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/reducers/authReducer';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
	login?: string;
};
const AdminLogin = () => {
	const params = useSearchParams();
	const messageError = params.get('error');

	const dispatch = useAppDispatch();

	const { auth } = useAppSelector((state) => state);

	const handleClickLogin = (data: FieldType) => {
		// dispatch(login(data));
		signIn('credentials', data);
	};

	useEffect(() => {
		if (messageError) {
			toast.error(messageError);
		}
	}, [messageError]);

	return (
		<div className='sm:w-full md:w-2/3 lg:w-1/3 2xl:w-1/4 2xl:h-3/5 sm:h-full md:h-full lg:h-4/5  bg-white p-10 rounded-lg '>
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
				<Form.Item<FieldType>
					label='Username'
					name='username'
					labelAlign='left'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label='Password'
					name='password'
					labelAlign='left'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<div className='flex justify-between'>
					<Form.Item<FieldType>
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

				<Form.Item<FieldType>
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
