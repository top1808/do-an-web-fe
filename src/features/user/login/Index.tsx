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
import React from 'react';

import backgroundlogin from '../../../../public/images/background-login.jpg';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
	confirmPassword?: string;
};
const UserLogin = () => {
	return (
		<div className='sm:w-full md:w-2/3 lg:w-1/3 2xl:w-1/4  bg-white p-10 rounded-lg '>
			<MTitle className='text-center'>Login</MTitle>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={() => {}}
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

				<Form.Item className='flex justify-center'>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
					>
						Log in
					</MButton>
				</Form.Item>
			</Form>
			<MTitle
				level={4}
				className='text-center'
			>
				Or Sign Up Using
			</MTitle>
			<MRow
				justify={'center'}
				gutter={12}
				className='mt-5'
			>
				<MCol>
					<MButton
						type='primary'
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem' }}
					>
						<FontAwesomeIcon
							icon={faFacebook}
							color='white'
							className='text-3xl'
						/>
					</MButton>
				</MCol>
				<MCol>
					<MButton
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem', backgroundColor: 'red' }}
					>
						<FontAwesomeIcon
							color='white'
							icon={faGoogle}
							className='text-3xl'
						/>
					</MButton>
				</MCol>
			</MRow>

			<MRow
				className='mt-12'
				justify={'center'}
			>
				<MCol className='flex flex-col gap-3 items-center'>
					<MTitle level={4}>Or Sign Up Using</MTitle>
					<Link
						href={'/register'}
						className='text-blue-600 font-bold text-xl'
					>
						SIGN UP
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserLogin;
