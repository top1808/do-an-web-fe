import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { STATUS_VOUCHER, TYPE_VOUCHER } from '@/constants';
import { Voucher } from '@/models/voucherModel';
import { useAppSelector } from '@/redux/hooks';
import { changeDateStringToDayjs, generateVoucherCode, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type VoucherFormProps = {
	onSubmit?: (data: Voucher) => void;
};

const INITIAL_VALUE: Voucher = {
	code: '',
	name: '',
	description: '',
	type: 'percent',
	maxDiscountValue: 0,
	minOrderValue: 0,
	value: 0,
	quantity: 0,
	dateEnd: '',
	dateStart: '',
	status: 'active',
};

const VoucherForm: React.FC<VoucherFormProps> = (props) => {
	const { voucher } = useAppSelector((state) => state);
	const { voucherEdit } = voucher;
	const router = useRouter();

	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm();
	const type = Form.useWatch('type', form);

	useEffect(() => {
		form.setFieldsValue(
			voucherEdit
				? { ...voucherEdit, dateEnd: changeDateStringToDayjs(voucherEdit.dateEnd as string), dateStart: changeDateStringToDayjs(voucherEdit.dateStart as string) }
				: { ...INITIAL_VALUE, code: generateVoucherCode() },
		);
	}, [form, voucherEdit]);

	useEffect(() => {
		if (voucher.status === 'completed') {
			router.push('/voucher');
		}
	}, [voucher.status, router]);

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
							name='code'
							label='Code'
							rules={[{ required: true }]}
						>
							<MInput
								size='large'
								disabled
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
							name='type'
							label='Type'
							rules={[{ required: true }]}
						>
							<MSelect
								placeholder='Select Type'
								options={TYPE_VOUCHER}
								size='large'
								disabled={!!voucherEdit}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='value'
							label='Value'
							rules={[{ required: true }]}
						>
							<InputNumber
								maxLength={type === 'percent' ? 2 : 10}
								placeholder='Enter value promotion...'
								size='large'
								className='w-full'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='minOrderValue'
							label='Minimum Order Value'
							rules={[{ required: true }]}
						>
							<InputNumber
								placeholder='Enter minimum order value...'
								size='large'
								className='w-full'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
							/>
						</Form.Item>
					</MCol>
					{type === 'percent' && (
						<MCol span={6}>
							<Form.Item
								name='maxDiscountValue'
								label='Max discount value'
								rules={[{ required: true }]}
							>
								<InputNumber
									placeholder='Enter max discount value...'
									size='large'
									className='w-full'
									formatter={handleFormatterInputNumber}
									parser={handleParserInputNumber}
								/>
							</Form.Item>
						</MCol>
					)}

					<MCol span={6}>
						<Form.Item
							name='quantity'
							label='Quantity'
							rules={[{ required: true }]}
						>
							<InputNumber
								placeholder='Enter Quantity...'
								size='large'
								className='w-full'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='dateStart'
							label='Start'
							rules={[{ required: true }]}
						>
							<DatePicker
								format='DD/MM/YYYY'
								placeholder='DD/MM/YYYY'
								allowClear={false}
								size='large'
								className='w-full'
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='dateEnd'
							label='End'
							rules={[{ required: true }]}
						>
							<DatePicker
								format='DD/MM/YYYY'
								placeholder='DD/MM/YYYY'
								allowClear={false}
								size='large'
								className='w-full'
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
								options={STATUS_VOUCHER}
								size='large'
							/>
						</Form.Item>
					</MCol>
					<MCol span={24}>
						<Form.Item
							name='description'
							label='Description'
						>
							<Input.TextArea
								placeholder='Enter description...'
								size='large'
								rows={3}
							/>
						</Form.Item>
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
		</MSkeleton>
	);
};

export default VoucherForm;
