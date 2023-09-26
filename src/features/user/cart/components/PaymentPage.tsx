import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MTitle from '@/components/MTitle';
import { DataPayment } from '@/models/paymentModels';
import { Form, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const PaymentPage = () => {
	const [value, setValue] = useState('');
	return (
		<Form
			autoComplete='off'
			onFinish={(values: any) => console.log(values)}
		>
			<MRow justify={'space-between'}>
				<MCol
					span={7}
					style={{ border: '1px solid black' }}
				>
					<MTitle
						level={4}
						className='pl-2 w-full bg-red-600'
						style={{ color: 'white' }}
					>
						1. ĐỊA CHỈ THANH TOÁN VÀ GIAO HÀNG
					</MTitle>
					<div className='p-4'>
						<h4>THÔNG TIN THANH TOÁN</h4>
						<Form.Item<DataPayment> name={'nameCustomer'}>
							<MInput placeholder='Họ và tên' />
						</Form.Item>
						<Form.Item<DataPayment> name='phone'>
							<MInput placeholder='Số điện thoại' />
						</Form.Item>
						<Form.Item<DataPayment> name='email'>
							<MInput placeholder='Email' />
						</Form.Item>
						<Form.Item<DataPayment> name={'location'}>
							<MInput placeholder='Địa chỉ chi tiết' />
						</Form.Item>
						<Form.Item<DataPayment> name='note'>
							<TextArea placeholder='Ghi chú đơn hàng' />
						</Form.Item>
					</div>
				</MCol>
				<MCol
					span={7}
					style={{ border: '1px solid black' }}
				>
					<MTitle
						level={4}
						className='pl-2 w-full bg-red-600'
						style={{ color: 'white' }}
					>
						2. THANH TOÁN VÀ VẬN CHUYỂN
					</MTitle>
					<Form.Item<DataPayment> name={'deliveryMethod'}>
						<MSelect
							className='px-2'
							defaultValue='normal'
							value={value}
							onChange={(value: string) => setValue(value)}
							options={[
								{ value: 'normal', label: 'Viettel Post' },
								{ value: 'save', label: 'VNPost Tiết Kiệm' },
								{ value: 'speed', label: 'AhaMove (Hỏa tốc )' },
							]}
						/>
					</Form.Item>
					<Form.Item<DataPayment> name={'paymentMethod'}>
						<Radio.Group className='px-2'>
							<Radio.Button value='Momo'>Momo</Radio.Button>
							<Radio.Button value='VietcomBank'>VietcomBank</Radio.Button>
							<Radio.Button value='Tiền mặt'>Tiền mặt</Radio.Button>
						</Radio.Group>
					</Form.Item>
				</MCol>
				<MCol
					span={7}
					style={{ border: '1px solid black' }}
				>
					<MTitle
						level={4}
						className='pl-2 xw-full bg-red-600'
						style={{ color: 'white' }}
					>
						3. THÔNG TIN ĐƠN HÀNG
					</MTitle>

					<MButton htmlType='submit'>OK</MButton>
				</MCol>
			</MRow>
		</Form>
	);
};

export default PaymentPage;
