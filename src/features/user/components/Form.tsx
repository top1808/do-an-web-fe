import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingRole } from '@/redux/reducers/roleReducer';
import { Form, Input } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type UserFormProps = {
	onSubmit?: (data: User) => void;
};

const INITIAL_VALUE: User = {
	username: '',
	password: '',
	name: '',
	email: '',
	image: '',
};

const UserForm: React.FC<UserFormProps> = (props) => {
	const { role, user } = useAppSelector((state) => state);
	const { userEdit } = user;
	const dispatch = useAppDispatch();
	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm();

	useEffect(() => {
		dispatch(gettingRole());
	}, [dispatch]);

	useEffect(() => {
		form.setFieldsValue(userEdit ? userEdit : INITIAL_VALUE);
	}, [form, userEdit]);

	return (
		<MSkeleton loading={user.loading || role.loading}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
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
							initImage={userEdit?.image}
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
							{!pathname.includes('edit') && (
								<MCol span={6}>
									<Form.Item
										name='password'
										label='Password'
										rules={[{ required: !userEdit }]}
									>
										<Input.Password
											placeholder='Enter password...'
											autoComplete='new-password'
											size='large'
										/>
									</Form.Item>
								</MCol>
							)}
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
							loading={user.loading}
						>
							{pathname.includes('create') ? 'Create' : 'Update'}
						</MButton>
					</MCol>
				</MRow>
			</Form>
		</MSkeleton>
	);
};

export default UserForm;
