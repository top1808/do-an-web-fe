import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { ORDER_STATUS } from '@/constants';
import { DiscountProgram } from '@/models/discountProgramModel';
import { useAppSelector } from '@/redux/hooks';
import { changeDateStringToDayjs, generateVoucherCode } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import FormAddProductDiscount from './FormAddProductDiscount';
import dayjs from 'dayjs';

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
				? { ...discountProgramEdit, date: [changeDateStringToDayjs(discountProgramEdit.dateStart as string), changeDateStringToDayjs(discountProgramEdit.dateEnd as string)] }
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
				onFinish={onSubmit}
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

					<MCol span={12}>
						<Form.Item
							name='date'
							label='From - To'
							rules={[{ required: true }]}
						>
							<DatePicker.RangePicker
								format='DD/MM/YYYY'
								allowClear={false}
								size='large'
								style={{ width: '100%' }}
								placeholder={['From', 'To']}
								disabledDate={(current) => {
									return dayjs().add(-1, 'days') >= current;
								}}
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
								options={ORDER_STATUS}
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
						onClick={() => form.submit()}
					>
						{pathname.includes('create') ? 'Create' : 'Update'}
					</MButton>
				</MCol>
			</MRow>
		</MSkeleton>
	);
};

export default DiscountProgramForm;
