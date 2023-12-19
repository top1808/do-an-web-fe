import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { STATUS_VOUCHER, TYPE_VOUCHER } from '@/constants';
import FormAddProduct from '@/features/order/components/FormAddProduct';
import { DiscountProgram } from '@/models/discountProgramModel';
import { useAppSelector } from '@/redux/hooks';
import { changeDateStringToDayjs, generateVoucherCode, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import FormAddProductDiscount from './FormAddProductDiscount';

type DiscountProgramFormProps = {
	onSubmit?: (data: DiscountProgram) => void;
};

const INITIAL_VALUE: DiscountProgram = {
	name: '',
	description: '',
	products: [],
	dateEnd: '',
	dateStart: '',
	status: 'active',
};

const DiscountProgramForm: React.FC<DiscountProgramFormProps> = (props) => {
	const { discountProgram } = useAppSelector((state) => state);
	const { discountProgramEdit } = discountProgram;

	const router = useRouter();

	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(
			discountProgramEdit
				? { ...discountProgramEdit, dateEnd: changeDateStringToDayjs(discountProgramEdit.dateEnd as string), dateStart: changeDateStringToDayjs(discountProgramEdit.dateStart as string) }
				: { ...INITIAL_VALUE, code: generateVoucherCode() },
		);
	}, [form, discountProgramEdit]);

	useEffect(() => {
		if (discountProgram.status === 'completed') {
			router.push('/discount-program');
		}
	}, [discountProgram.status, router]);

	return (
		<MSkeleton loading={discountProgram.loading}>
			<Form
				// onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={8}>
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
			</Form>
			<FormAddProductDiscount />
			<MRow
				gutter={8}
				justify='end'
				className='mt-4'
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
						onClick={() => onSubmit?.(form.getFieldsValue() as DiscountProgram)}
					>
						{pathname.includes('create') ? 'Create' : 'Update'}
					</MButton>
				</MCol>
			</MRow>
		</MSkeleton>
	);
};

export default DiscountProgramForm;
