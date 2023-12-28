import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { Order } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleModalTransport } from '@/redux/reducers/modalReducer';
import { changingStatusOrder } from '@/redux/reducers/orderReducer';
import { formatDate, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { DatePicker, Form, InputNumber, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';

const ModalTransport = () => {
	const { modal, order } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const { itemOrder } = modal;

	const btnSubmitRef = useRef<HTMLButtonElement | null>(null);

	const [form] = Form.useForm();

	const onSubmit = (data: Order) => {
		const date = form.getFieldValue('date');
		const body: Order = {
			...data,
			deliveryDate: formatDate(date[0]),
			receivedDate: formatDate(date[1]),
			status: 'delivering',
		};
		dispatch(changingStatusOrder({ id: itemOrder?._id, ...body }));
		dispatch(toggleModalTransport(null));
	};

	useEffect(() => {
		if (!modal.isOpen) {
			form.resetFields();
		} else {
			form.setFieldsValue({
				...itemOrder,
			});
		}
	}, [form, itemOrder, modal.isOpen]);

	return (
		<Modal
			title='Transport'
			open={modal.isOpen}
			okText='Xác nhận'
			onCancel={() => dispatch(toggleModalTransport(null))}
			onOk={() => btnSubmitRef.current?.click()}
			confirmLoading={order.isChangingStatus}
		>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={4}>
					<MCol span={24}>
						<Form.Item
							name='deliveryAddress'
							label='Delivery Address'
							rules={[{ required: true }]}
						>
							<MInput
								placeholder='Enter Delivery Address...'
								size='large'
								onChange={() => form.setFieldValue('deliveryFee', 30000)}
							/>
						</Form.Item>
					</MCol>
					<MCol span={24}>
						<Form.Item
							name='deliveryFee'
							label='Delivery Fee'
						>
							<InputNumber
								className='w-full'
								size='large'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								disabled
							/>
						</Form.Item>
					</MCol>
					<MCol span={24}>
						<Form.Item
							name='date'
							label='Delivery Date - Expect Received Date'
							rules={[{ required: true }]}
						>
							<DatePicker.RangePicker
								format='DD/MM/YYYY'
								allowClear={false}
								size='large'
								style={{ width: '100%' }}
								placeholder={['Delivery Date', 'Expect Received Date']}
								disabledDate={(current) => {
									return dayjs().add(-1, 'days') >= current;
								}}
							/>
						</Form.Item>
					</MCol>
				</MRow>
				<button
					type='submit'
					hidden
					ref={btnSubmitRef}
				></button>
			</Form>
		</Modal>
	);
};

export default ModalTransport;
