import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { Customer } from '@/models/customerModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeDateStringToDayjs } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type CustomerFormProps = {
	onSubmit?: (data: Customer) => void;
};

const INITIAL_VALUE: Customer = {
	password: '',
	name: '',
	email: '',
	image: '',
	birthday: '',
	address: '',
	phoneNumber: '',
};

const CustomerForm: React.FC<CustomerFormProps> = (props) => {
	const { customer } = useAppSelector((state) => state);
	const { customerEdit } = customer;

	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(customerEdit ? { ...customerEdit, birthday: changeDateStringToDayjs(customerEdit.birthday as string) } : INITIAL_VALUE);
	}, [form, customerEdit]);

	return (
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
						initImage={customerEdit?.image}
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
								name='password'
								label='Password'
								rules={[{ required: !customerEdit }]}
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
								name='address'
								label='Address'
							>
								<MInput
									placeholder='Enter address...'
									size='large'
								/>
							</Form.Item>
						</MCol>

						<MCol span={6}>
							<Form.Item
								name='phoneNumber'
								label='Phone Number'
							>
								<MInput
									placeholder='Enter phone number...'
									size='large'
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='birthday'
								label='Birthday'
							>
								<DatePicker
									format='DD/MM/YYYY'
									placeholder='DD/MM/YYYY'
									allowClear={false}
									size='large'
									style={{ width: '100%' }}
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

export default CustomerForm;
