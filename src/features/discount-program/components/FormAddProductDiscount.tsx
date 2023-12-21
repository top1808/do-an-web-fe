import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, InputNumber } from 'antd';
import React, { useCallback, useEffect } from 'react';
import TableProductDiscount from './TableProductDiscount';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { DiscountProgram, DiscountProgramProduct } from '@/models/discountProgramModel';
import { gettingProduct } from '@/redux/reducers/productReducer';
import { TYPE_VOUCHER } from '@/constants';
import { addDiscountProgramProduct, editDiscountProgramProductEdit } from '@/redux/reducers/discountProgramReducer';
import { toast } from 'react-toastify';

interface FormAddProductDiscountProps {}

const FormAddProductDiscount = (props: FormAddProductDiscountProps) => {
	const { product, discountProgram } = useAppSelector((state) => state);

	const { discountProgramProductEdit } = discountProgram;

	const dispatch = useAppDispatch();

	const [form] = Form.useForm<DiscountProgramProduct>();
	const type = Form.useWatch('type', form);
	const value = Form.useWatch('value', form);
	const price = Form.useWatch('price', form);

	const onResetForm = () => {
		form.resetFields();
	};

	const onSubmit = (data: DiscountProgramProduct) => {
		if (!discountProgramProductEdit) {
			dispatch(addDiscountProgramProduct(data));
			toast.success('Add Product Success');
		} else {
			dispatch(editDiscountProgramProductEdit(data));
			toast.success('Update Product Success');
		}
		onResetForm();
	};

	const onChangeProduct = useCallback(
		(id?: string) => {
			const productSelected = product.data?.find((c) => c._id === id);
			if (productSelected) {
				form.setFieldsValue({
					productName: productSelected?.name,
					productCode: productSelected?._id,
					price: productSelected?.price,
				});
			}
		},
		[form, product.data],
	);

	useEffect(() => {
		if (type && value && price) {
			const promotionPrice = type === 'percent' ? Math.round((price * (100 - value)) / 100) : price - value;
			form.setFieldValue('promotionPrice', promotionPrice);
		} else {
			form.setFieldValue('promotionPrice', '');
		}
	}, [type, value, price, form]);

	useEffect(() => {
		if (discountProgramProductEdit) {
			form.setFieldsValue(discountProgramProductEdit);
			onChangeProduct(discountProgramProductEdit?.productCode);
		}
	}, [form, discountProgramProductEdit, onChangeProduct]);

	useEffect(() => {
		dispatch(gettingProduct({}));
	}, [dispatch]);

	return (
		<MCard
			title='Add Product'
			className='mt-2'
		>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={8}>
					<MCol span={6}>
						<Form.Item
							name='productCode'
							label='Product Code'
							rules={[{ required: true }]}
						>
							<MSelect
								placeholder='Select a product'
								options={product?.data?.map((c) => ({
									value: c._id,
									label: c._id,
								}))}
								size='large'
								onChange={onChangeProduct}
								disabled={!!discountProgramProductEdit}
							/>
						</Form.Item>
					</MCol>
					<MCol span={6}>
						<Form.Item
							name='productName'
							label='Product Name'
							rules={[{ required: true }]}
						>
							<MSelect
								placeholder='Select a product'
								options={product?.data?.map((c) => ({
									value: c._id,
									label: c.name,
								}))}
								size='large'
								onChange={onChangeProduct}
								disabled={!!discountProgramProductEdit}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='price'
							label='Product Price'
						>
							<InputNumber
								placeholder='Enter price...'
								className='w-full'
								size='large'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								disabled
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
								placeholder='Select a type'
								options={TYPE_VOUCHER}
								size='large'
								onChange={() => form.setFieldValue('value', '')}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='value'
							label='Value Discount'
							rules={[{ required: true }]}
						>
							<InputNumber
								placeholder='Enter value...'
								className='w-full'
								size='large'
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								maxLength={type === 'percent' ? 2 : 10}
							/>
						</Form.Item>
					</MCol>

					<MCol span={6}>
						<Form.Item
							name='promotionPrice'
							label='Promotion Price'
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
				</MRow>
				<MRow
					gutter={8}
					justify='end'
				>
					{discountProgramProductEdit ? (
						<MCol>
							<MButton
								type='primary'
								className='bg-red-500'
								onClick={() => {
									// dispatch(setdiscountProgramProductEdit(null));
									onResetForm();
								}}
							>
								Cancel
							</MButton>
						</MCol>
					) : (
						<MCol>
							<MButton
								type='primary'
								className='bg-gray-400'
								onClick={onResetForm}
							>
								Reset
							</MButton>
						</MCol>
					)}
					<MCol>
						<MButton
							type='primary'
							htmlType='submit'
						>
							{discountProgramProductEdit ? 'Update' : 'Add'}
						</MButton>
					</MCol>
				</MRow>
			</Form>
			<TableProductDiscount />
		</MCard>
	);
};

export default FormAddProductDiscount;
