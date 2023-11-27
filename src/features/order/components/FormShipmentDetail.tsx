import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MText from '@/components/MText';
import { PAYMENT_METHOD } from '@/constants';
import { Order } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { creatingOrder, edittingOrder, setPaidAmount, toggleAddOrderProductPage } from '@/redux/reducers/orderReducer';
import { customMoney, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, InputNumber } from 'antd';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface FormShipmentDetailProps {}

const FormShipmentDetail: React.FC<FormShipmentDetailProps> = (props) => {
	const { order } = useAppSelector((state) => state);
	const { orderPost } = order;

	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const [form] = Form.useForm();

	const onSubmit = (data: Order) => {
		const dataSubmit: Order = {
			...orderPost,
			...data,
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

	useEffect(() => {
		if (orderPost) {
			form.setFieldsValue(orderPost);
		}
	}, [form, orderPost]);

	useEffect(() => {
		form.setFieldValue('deliveryFee', 30000);
	}, [form]);

	return (
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
						rules={[{ required: true }]}
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
						Subtotal: <MText className='text-red-400'>{customMoney(orderPost?.totalProductPrice as number)}</MText>
					</MText>
				</MCol>
				<MCol
					offset={18}
					span={6}
				>
					<MText className='font-bold text-base'>
						Delivery Fee: <MText className='text-red-400'>{customMoney(orderPost?.deliveryFee as number)}</MText>
					</MText>
				</MCol>
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
						Total: <MText className='text-red-400'>{customMoney(orderPost?.totalPrice as number)}</MText>
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
	);
};

export default FormShipmentDetail;
