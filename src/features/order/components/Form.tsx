import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { STATUS_ORDER } from '@/constants';
import { Order } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingCustomers } from '@/redux/reducers/customerReducer';
import { changeDateStringToDayjs, generateCode } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import FormAddProduct from './FormAddProduct';
import { addOrderCustomerInfo, toggleAddOrderProductPage } from '@/redux/reducers/orderReducer';
import FormShipmentDetail from './FormShipmentDetail';

interface OrderFormProps {}

const OrderForm: React.FC<OrderFormProps> = (props) => {
	const { customer, order } = useAppSelector((state) => state);
	const { orderPost } = order;

	const dispatch = useAppDispatch();

	const [form] = Form.useForm();

	const onSubmit = (data: Order) => {
		delete data.createdAt;
		dispatch(addOrderCustomerInfo(data));
		dispatch(toggleAddOrderProductPage());
	};

	const onChangeCustomer = (id: string) => {
		const customerSelected = customer.data?.find((c) => c.id === id);
		if (customerSelected) {
			form.setFieldValue('customerCode', customerSelected?.id);
			form.setFieldValue('customerName', customerSelected?.name);
			form.setFieldValue('customerPhone', customerSelected?.phoneNumber);
			form.setFieldValue('customerAddress', customerSelected?.address);
		}
	};

	useEffect(() => {
		if (orderPost) {
			form.setFieldsValue({
				...orderPost,
				createdAt: changeDateStringToDayjs(orderPost.createdAt as string),
			});
		}
	}, [form, orderPost]);

	useEffect(() => {
		dispatch(gettingCustomers({ offset: '0', limit: '1000' }));
	}, [dispatch]);

	return (
		<>
			{order.isAddOrderShipmentDetail ? (
				<FormShipmentDetail />
			) : order.isAddOrderProduct ? (
				<FormAddProduct />
			) : (
				<Form
					layout='vertical'
					form={form}
					onFinish={onSubmit}
				>
					<MRow gutter={8}>
						<MCol span={24}>
							<MRow gutter={12}>
								<MCol span={6}>
									<Form.Item
										name='orderCode'
										label='Order Code'
									>
										<MInput
											size='large'
											disabled
										/>
									</Form.Item>
								</MCol>
								<MCol span={6}>
									<Form.Item
										name='customerCode'
										label='Customer Code'
										rules={[{ required: true }]}
									>
										<MSelect
											placeholder='Select a customer'
											options={customer?.data?.map((c) => ({
												value: c.id,
												label: c.id,
											}))}
											size='large'
											onChange={onChangeCustomer}
										/>
									</Form.Item>
								</MCol>
								<MCol span={6}>
									<Form.Item
										name='customerName'
										label='Customer Name'
										rules={[{ required: true }]}
									>
										<MSelect
											placeholder='Select a customer'
											options={customer?.data?.map((c) => ({
												value: c.id,
												label: c.name,
											}))}
											size='large'
											onChange={onChangeCustomer}
										/>
									</Form.Item>
								</MCol>
								<MCol span={6}>
									<Form.Item
										name='customerPhone'
										label='Customer Phone'
									>
										<MInput
											placeholder='Enter Customer Phone...'
											size='large'
										/>
									</Form.Item>
								</MCol>
								<MCol span={6}>
									<Form.Item
										name='customerAddress'
										label='Customer Address'
									>
										<MInput
											placeholder='Enter Customer Address...'
											size='large'
										/>
									</Form.Item>
								</MCol>

								<MCol span={6}>
									<Form.Item
										name='createdAt'
										label='Created At'
									>
										<DatePicker
											format='DD/MM/YYYY'
											placeholder='DD/MM/YYYY'
											allowClear={false}
											size='large'
											style={{ width: '100%' }}
											disabled
										/>
									</Form.Item>
								</MCol>
								<MCol span={6}>
									<Form.Item
										name='status'
										label='Status'
										rules={[{ required: true }]}
									>
										<MSelect
											placeholder='Select status'
											options={STATUS_ORDER}
											size='large'
										/>
									</Form.Item>
								</MCol>
								<MCol span={24}>
									<Form.Item
										name='note'
										label='Note'
									>
										<Input.TextArea
											placeholder='Enter Note...'
											size='large'
											rows={3}
										/>
									</Form.Item>
								</MCol>
							</MRow>
						</MCol>
					</MRow>
					<MRow
						gutter={8}
						justify='end'
						className='mt-2'
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
								Next
							</MButton>
						</MCol>
					</MRow>
				</Form>
			)}
			{/* <MRow
				gutter={8}
				justify='end'
				className='mt-8'
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
						onClick={onSubmit}
					>
						{pathname.includes('create') ? 'Create' : 'Update'}
					</MButton>
				</MCol>
			</MRow> */}
		</>
	);
};

export default OrderForm;
