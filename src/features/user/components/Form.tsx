import uploadApi from '@/api/uploadApi';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MUpload from '@/components/MUpload';
import MUploadImage from '@/components/MUploadImage';
import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingRole } from '@/redux/reducers/roleReducer';
import { Form, Input } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type UserFormProps = {
	onSubmit?: (data: User) => void;
};

const inititalValue: User = {
	username: '',
	password: '',
	name: '',
	email: '',
	image: '',
};

const UserForm: React.FC<UserFormProps> = (props) => {
	const { role } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const { onSubmit } = props;
	const pathname = usePathname();

	useEffect(() => {
		dispatch(gettingRole());
	}, [dispatch]);

	return (
		<Form
			onFinish={onSubmit}
			layout='vertical'
			initialValues={inititalValue}
		>
			<MRow gutter={8}>
				<MCol span={3}>
					<MForm.UploadImage
						formLabel='Avatar'
						formName='image'
						name='image'
						action={`${process.env.API_UPLOAD_URL}image/upload`}
						accept='image/*'
						listType='picture-card'
						multiple={false}
						showUploadList={false}
					>
						Upload
					</MForm.UploadImage>
				</MCol>
				<MCol span={21}>
					<MRow gutter={12}>
						<MCol span={6}>
							<Form.Item
								name='username'
								label='Username'
								rules={[{ required: true }]}
							>
								<MInput
									placeholder='Enter username...'
									size='large'
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='password'
								label='Password'
								rules={[{ required: true }]}
							>
								<Input.Password
									placeholder='Enter password...'
									autoComplete='new-password'
									size='large'
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='name'
								label='Name'
								rules={[{ required: true }]}
							>
								<MInput
									placeholder='Enter Name...'
									size='large'
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='email'
								label='Email'
								rules={[{ required: true }]}
							>
								<MInput
									placeholder='Enter Email...'
									size='large'
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='roleId'
								label='Role'
								rules={[{ required: true }]}
							>
								<MSelect
									placeholder='Select a role'
									options={role.roles?.map((r) => ({
										value: r._id,
										label: r.name,
									}))}
									size='large'
								/>
							</Form.Item>
						</MCol>
					</MRow>
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
						type='primary'
						htmlType='submit'
					>
						{pathname.includes('create') ? 'Create' : 'Update'}
					</MButton>
				</MCol>
			</MRow>
		</Form>
	);
};

export default UserForm;
