import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { STATUS_VOUCHER } from '@/constants';
import { DiscountProgram } from '@/models/discountProgramModel';
import { useAppSelector } from '@/redux/hooks';
import { changeDateStringToDayjs, generateVoucherCode } from '@/utils/FuntionHelpers';
import { DatePicker, Form, Input } from 'antd';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import FormAddProductDiscount from './FormAddProductDiscount';
import dayjs from 'dayjs';
import TableProductDiscount from './TableProductDiscount';
import { getDiscountProgramState } from '@/redux/reducers/discountProgramReducer';

type DiscountProgramFormViewProps = {
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

const DiscountProgramFormView: React.FC<DiscountProgramFormViewProps> = (props) => {
	const discountProgram = useAppSelector(getDiscountProgramState);

	const { discountProgramEdit } = discountProgram;

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
						>
							<MInput
								placeholder='Enter Name...'
								size='large'
								disabled
							/>
						</Form.Item>
					</MCol>

					<MCol span={12}>
						<Form.Item
							name='date'
							label='From - To'
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
								disabled
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='status'
							label='Status'
						>
							<MSelect
								placeholder='Select status'
								options={STATUS_VOUCHER}
								size='large'
								disabled={!!discountProgramEdit}
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
								disabled
							/>
						</Form.Item>
					</MCol>
				</MRow>
			</Form>
			<TableProductDiscount />
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
			</MRow>
		</MSkeleton>
	);
};

export default DiscountProgramFormView;
