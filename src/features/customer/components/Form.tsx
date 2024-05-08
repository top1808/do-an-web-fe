import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import MUploadImage from '@/components/MUploadImage';
import { Customer } from '@/models/customerModel';
import { useAppSelector } from '@/redux/hooks';
import { getCustomerState } from '@/redux/reducers/customerReducer';
import { changeDateStringToDayjs, checkPhoneNumber } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input } from 'antd';
import { useRouter } from 'next-nprogress-bar';
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
	const { onSubmit } = props;

	const customer = useAppSelector(getCustomerState);

	const { customerEdit } = customer;

	const router = useRouter();
	const pathname = usePathname();
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(customerEdit ? { ...customerEdit, birthday: changeDateStringToDayjs(customerEdit.birthday as string) } : INITIAL_VALUE);
	}, [form, customerEdit]);

	useEffect(() => {
		if (customer.status === 'completed') {
			router.push('/customer');
		}
	}, [customer.status, router]);

	return (
		<MSkeleton loading={customer.isGetCustomerInfo}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={8}>
					<MCol span={3}>
						<MUploadImage
							image={customerEdit?.image || ''}
							formName='image'
						/>
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
							{!pathname.includes('edit') && (
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
									rules={[{ required: true, validator: (_, value) => checkPhoneNumber(value) }]}
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
							loading={customer.loading}
						>
							{pathname.includes('create') ? 'Create' : 'Update'}
						</MButton>
					</MCol>
				</MRow>
			</Form>
		</MSkeleton>
	);
};

export default CustomerForm;
