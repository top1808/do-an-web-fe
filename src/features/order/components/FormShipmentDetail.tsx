import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import { PAYMENT_METHOD } from '@/constants';
import { Order } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { applyVoucher, creatingOrder, edittingOrder, setPaidAmount, toggleAddOrderProductPage, clearVoucher, getOrderState } from '@/redux/reducers/orderReducer';
import { getVoucherState, gettingVouchers } from '@/redux/reducers/voucherReducer';
import { customMoney, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, InputNumber } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface FormShipmentDetailProps {}

const FormShipmentDetail: React.FC<FormShipmentDetailProps> = (props) => {
	const order = useAppSelector(getOrderState);
	const voucher = useAppSelector(getVoucherState);

	const { orderPost, orderEdit } = order;

	const router = useRouter();

	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const [form] = Form.useForm();

	const onSubmit = (data: Order) => {
		const dataSubmit: Order = {
			...orderPost,
			...data,
			products: orderPost?.products?.map((item) => {
				let option1 = item?.option1 ? JSON.parse(item?.option1 || '') : null;
				option1 = option1
					? {
							groupName: Object.keys(option1)[0],
							option: Object.values(option1)[0],
					  }
					: null;
				let option2 = item?.option2 ? JSON.parse(item?.option2 || '') : null;
				option2 = option2
					? {
							groupName: Object.keys(option2)[0],
							option: Object.values(option2)[0],
					  }
					: null;
				const options = [option1, option2]?.filter((item) => item);
				return {
					...item,
					options: options,
				};
			}),
		};

		if (pathname.includes('create')) {
			dispatch(creatingOrder(dataSubmit));
		} else {
			dispatch(edittingOrder(dataSubmit));
		}
	};

	const onChangeTotalPaid = (value: number | null) => {
		dispatch(setPaidAmount(value || 0));
	};

	const onChangeVoucher = (code: string) => {
		const findVoucher = voucher?.data?.find((e) => e.code === code);
		if (findVoucher) {
			dispatch(applyVoucher(findVoucher));
		} else {
			dispatch(clearVoucher());
		}
		form.setFieldValue('voucherDescription', findVoucher?.description || '');
		form.setFieldValue('voucherName', findVoucher?.name || '');
	};

	useEffect(() => {
		if (orderEdit) {
			form.setFieldsValue(orderEdit);
			onChangeVoucher(orderEdit?.voucherCode || '');
			onChangeTotalPaid(orderEdit?.totalPaid || 0);
		} else {
			dispatch(setPaidAmount(0));
			dispatch(gettingVouchers({}));
		}
	}, [dispatch, form, orderEdit]);

	useEffect(() => {
		form.setFieldValue('deliveryFee', 30000);
	}, [form]);

	useEffect(() => {
		if (order.status === 'completed') {
			router.push('/order');
		}
	}, [order.status, router]);

	return (
		<MSkeleton loading={voucher.loading}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={8}>
					<MCol span={6}>
						<Form.Item
							name='paymentMethod'
							label='Payment Method'
							rules={[{ required: true }]}
						>
							<MSelect
								placeholder='Select a payment method'
								options={PAYMENT_METHOD}
								size='large'
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
								placeholder='Enter paid amount'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								onChange={onChangeTotalPaid}
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='deliveryAddress'
							label='Delivery Address'
							rules={[{ required: true }]}
						>
							<MInput
								placeholder='Enter Delivery Address...'
								size='large'
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='deliveryFee'
							label='Delivery Free'
						>
							<InputNumber
								className='w-full'
								size='large'
								placeholder='Enter paid amount'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								disabled
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='voucherCode'
							label='Voucher Code'
						>
							<MSelect
								placeholder='Select a voucher code'
								options={voucher.data?.map((e) => ({ label: e.code, value: e.code }))}
								size='large'
								onChange={onChangeVoucher}
								allowClear
							/>
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
					<MCol span={6}>
						<Form.Item
							name='voucherDescription'
							label='Voucher description'
						>
							<MInput
								size='large'
								disabled
							/>
						</Form.Item>
					</MCol>
				</MRow>
				<MRow
					gutter={8}
					justify='end'
					className='mt-2'
				>
					<MCol
						offset={18}
						span={6}
					>
						<MText className='font-bold text-base'>
							Subtotal: <MText className='text-red-500'>{customMoney(orderPost?.totalProductPrice as number)}</MText>
						</MText>
					</MCol>
					<MCol
						offset={18}
						span={6}
					>
						<MText className='font-bold text-base'>
							Delivery Fee: <MText className='text-red-500'>{customMoney(orderPost?.deliveryFee as number)}</MText>
						</MText>
					</MCol>
					{!!orderPost?.voucherDiscount && (
						<MCol
							offset={18}
							span={6}
						>
							<MText className='font-bold text-base'>
								Voucher: <MText className='text-red-500'>-{customMoney(orderPost?.voucherDiscount as number)}</MText>
							</MText>
						</MCol>
					)}
					<MCol
						offset={18}
						span={6}
					>
						<MText className='font-bold text-base'>
							Paid Amount: <MText className='text-red-500'>{customMoney(orderPost?.totalPaid as number)}</MText>
						</MText>
					</MCol>
					<MCol
						offset={18}
						span={6}
					>
						<MText className='font-bold text-base'>
							Total: <MText className='text-red-500'>{customMoney(orderPost?.totalPrice as number)}</MText>
						</MText>
					</MCol>
				</MRow>
				<MRow
					gutter={8}
					justify='end'
					className='mt-4'
				>
					<MCol>
						<MButton
							type='primary'
							className='bg-gray-400'
							onClick={() => dispatch(toggleAddOrderProductPage())}
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
		</MSkeleton>
	);
};

export default FormShipmentDetail;
