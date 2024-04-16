import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { ORDER_STATUS, PAYMENT_METHOD } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { customMoney, formatDate, handleFormatterInputNumber } from '@/utils/FuntionHelpers';
import { Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import MSkeleton from '@/components/MSkeleton';
import { usePathname } from 'next/navigation';
import TableOrderProduct from './TableOrderProduct';
import MText from '@/components/MText';

interface OrderFormViewProps {}

const OrderFormView: React.FC<OrderFormViewProps> = () => {
	const { order } = useAppSelector((state) => state);
	const { orderPost } = order;

	const pathname = usePathname();

	const [form] = Form.useForm();

	useEffect(() => {
		if (orderPost) {
			form.setFieldsValue({
				...orderPost,
				paymentMethod: PAYMENT_METHOD.find((pm) => pm.value === orderPost?.paymentMethod)?.label,
				createdAt: formatDate(orderPost.createdAt as string, 'DD/MM/YYYY'),
				receivedDate: orderPost.receivedDate ? formatDate(orderPost.receivedDate as string, 'DD/MM/YYYY') : '',
				deliveryDate: orderPost.deliveryDate ? formatDate(orderPost.deliveryDate as string, 'DD/MM/YYYY') : '',
				status: ORDER_STATUS?.find((item) => item.value === orderPost.status)?.label,
				voucherName: orderPost?.voucher?.name,
				voucherDescription: orderPost?.voucher?.description,
			});
		}
	}, [form, orderPost]);

	return (
		<MSkeleton loading={order?.loading}>
			<Form
				layout='vertical'
				form={form}
				disabled={pathname.includes('view')}
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
								>
									<MInput
										size='large'
										disabled
									/>
								</Form.Item>
							</MCol>
							<MCol span={6}>
								<Form.Item
									name='customerName'
									label='Customer Name'
								>
									<MInput
										size='large'
										disabled
									/>
								</Form.Item>
							</MCol>
							<MCol span={6}>
								<Form.Item
									name='customerPhone'
									label='Customer Phone'
								>
									<MInput size='large' />
								</Form.Item>
							</MCol>
							<MCol span={6}>
								<Form.Item
									name='customerAddress'
									label='Customer Address'
								>
									<MInput size='large' />
								</Form.Item>
							</MCol>

							<MCol span={6}>
								<Form.Item
									name='createdAt'
									label='Created At'
								>
									<MInput
										size='large'
										disabled
									/>
								</Form.Item>
							</MCol>
							<MCol span={6}>
								<Form.Item
									name='status'
									label='Status'
								>
									<MInput
										size='large'
										disabled
									/>
								</Form.Item>
							</MCol>
							<MCol span={24}>
								<Form.Item
									name='note'
									label='Note'
								>
									<Input.TextArea
										size='large'
										rows={3}
									/>
								</Form.Item>
							</MCol>
						</MRow>
					</MCol>
				</MRow>
			</Form>

			<TableOrderProduct />

			<Form
				layout='vertical'
				form={form}
				disabled={pathname.includes('view')}
				className='mt-4'
			>
				<MRow gutter={8}>
					<MCol span={6}>
						<Form.Item
							name='paymentMethod'
							label='Payment Method'
						>
							<MInput
								size='large'
								disabled
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='totalPaid'
							label='Paid Amount'
						>
							<InputNumber
								className='w-full'
								size='large'
								formatter={handleFormatterInputNumber}
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='deliveryAddress'
							label='Delivery Address'
						>
							<MInput size='large' />
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='deliveryFee'
							label='Delivery Fee'
						>
							<InputNumber
								className='w-full'
								size='large'
								formatter={handleFormatterInputNumber}
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='deliveryDate'
							label='Delivery Date'
						>
							<Input
								className='w-full'
								size='large'
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='receivedDate'
							label='Expected Delivery'
						>
							<Input
								className='w-full'
								size='large'
							/>
						</Form.Item>
					</MCol>
					{orderPost?.voucher && (
						<>
							<MCol span={6}>
								<Form.Item
									name='voucherCode'
									label='Voucher Code'
								>
									<MInput size='large' />
								</Form.Item>
							</MCol>
							<MCol span={6}>
								<Form.Item
									name='voucherName'
									label='Voucher name'
								>
									<MInput
										size='large'
										disabled
									/>
								</Form.Item>
							</MCol>
						</>
					)}
					{orderPost?.status === 'canceled' && (
						<MCol span={24}>
							<Form.Item
								name='reasonCancel'
								label='Reason Cancel Order'
							>
								<Input.TextArea
									size='large'
									rows={3}
								/>
							</Form.Item>
						</MCol>
					)}
				</MRow>
				<MRow
					gutter={8}
					justify='end'
					className='mt-2'
				>
					<MCol
						offset={18}
						span={6}
						className='text-end'
					>
						<MText className='font-bold text-base'>
							Subtotal: <MText className='text-red-500'>{customMoney(orderPost?.totalProductPrice as number)}</MText>
						</MText>
					</MCol>
					<MCol
						offset={18}
						span={6}
						className='text-end'
					>
						<MText className='font-bold text-base'>
							Delivery Fee: <MText className='text-red-500'>{customMoney(orderPost?.deliveryFee as number)}</MText>
						</MText>
					</MCol>
					{!!orderPost?.voucherDiscount && (
						<MCol
							offset={18}
							span={6}
							className='text-end'
						>
							<MText className='font-bold text-base'>
								Voucher: <MText className='text-red-500'>-{customMoney(orderPost?.voucherDiscount as number)}</MText>
							</MText>
						</MCol>
					)}
					{!!orderPost?.totalPaid && (
						<MCol
							offset={18}
							span={6}
							className='text-end'
						>
							<MText className='font-bold text-base'>
								Paid Amount: <MText className='text-red-500'>{customMoney(orderPost?.totalPaid as number)}</MText>
							</MText>
						</MCol>
					)}
					<MCol
						offset={18}
						span={6}
						className='text-end'
					>
						<MText className='font-bold text-base'>
							Total: <MText className='text-red-500'>{customMoney(orderPost?.totalPrice as number)}</MText>
						</MText>
					</MCol>
				</MRow>
			</Form>
			<MRow
				gutter={8}
				justify='end'
				className='mt-4'
			>
				<MCol>
					<MButton
						className='bg-gray-400 hover:bg-gray-300 text-white'
						isGoBack
					>
						Back
					</MButton>
				</MCol>
			</MRow>
		</MSkeleton>
	);
};

export default OrderFormView;
