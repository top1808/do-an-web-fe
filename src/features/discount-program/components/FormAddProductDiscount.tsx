import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, InputNumber } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import TableProductDiscount from './TableProductDiscount';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { DiscountProgramProduct } from '@/models/discountProgramModel';
import { gettingAllProduct } from '@/redux/reducers/productReducer';
import { TYPE_VOUCHER } from '@/constants';
import { addDiscountProgramProduct, editDiscountProgramProductEdit, setDiscountProgramProductEdit } from '@/redux/reducers/discountProgramReducer';
import { toast } from 'react-toastify';
import { Product } from '@/models/productModels';

interface FormAddProductDiscountProps {}

const FormAddProductDiscount = (props: FormAddProductDiscountProps) => {
	const { product, discountProgram } = useAppSelector((state) => state);

	const { discountProgramProductEdit } = discountProgram;

	const dispatch = useAppDispatch();

	const [productSelect, setProductSelect] = useState<Product | null>(null);

	const [form] = Form.useForm<DiscountProgramProduct>();
	const type = Form.useWatch('type', form);
	const value = Form.useWatch('value', form);
	const price = Form.useWatch('price', form);

	const onResetForm = useCallback(() => {
		setProductSelect(null);
		form.resetFields();
	}, [form]);

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
			onResetForm();
			const productSelected = product.data?.find((c) => c._id === id);
			setProductSelect(productSelected as Product);
			if (productSelected) {
				form.setFieldsValue({
					productName: productSelected?.name,
					productCode: productSelected?._id,
					productQuantity: productSelected?.quantity,
					price: productSelected?.price,
				});
			}
		},
		[form, onResetForm, product.data],
	);

	const onChangeProductSKU = (barcode?: string) => {
		const productSKUSelected = productSelect?.productSKUList?.find((c) => c.barcode === barcode);
		if (productSKUSelected) {
			form.setFieldsValue({
				...form.getFieldsValue(),
				option1: JSON.stringify({ [productSKUSelected?.options[0]?.groupName || '']: productSKUSelected?.options[0]?.option }),
				option2: JSON.stringify({ [productSKUSelected?.options[1]?.groupName || '']: productSKUSelected?.options[1]?.option }),
				price: productSKUSelected?.price,
			});
		}
	};

	const onChangeProductSKUOption = () => {
		const option1 = form.getFieldValue('option1') ? JSON.parse(form.getFieldValue('option1')) : '';
		const option2 = form.getFieldValue('option2') ? JSON.parse(form.getFieldValue('option2')) : '';

		const productSKUSelected = productSelect?.productSKUList?.find(
			(c) => c.options[0]?.option === option1[c.options[0]?.groupName || ''] && (c.options[1] ? c.options[1]?.option === option2[c.options[1]?.groupName || ''] : true),
		);

		if (productSKUSelected) {
			form.setFieldsValue({
				...form.getFieldsValue(),
				productSKUBarcode: productSKUSelected?.barcode,
				option1: JSON.stringify({ [productSKUSelected?.options[0]?.groupName || '']: productSKUSelected?.options[0]?.option }),
				option2: JSON.stringify({ [productSKUSelected?.options[1]?.groupName || '']: productSKUSelected?.options[1]?.option }),
				price: productSKUSelected?.price,
			});
		}
	};

	useEffect(() => {
		if (type && value && price) {
			const promotionPrice = type === 'percent' ? Math.round((price * (100 - value)) / 100) : price - value;
			if (promotionPrice < 0) {
				form.setFieldValue('value', price);
				form.setFieldValue('promotionPrice', 0);
			} else {
				form.setFieldValue('promotionPrice', promotionPrice);
			}
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
		dispatch(gettingAllProduct());
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

					{(productSelect?.productSKUList?.length || 0) > 0 && (
						<>
							<MCol span={6}>
								<Form.Item
									name='productSKUBarcode'
									label='Product SKU Barcode'
									rules={[{ required: true }]}
								>
									<MSelect
										placeholder='Select a product SKU'
										options={productSelect?.productSKUList?.map((c) => ({
											value: c.barcode,
											label: c.barcode,
										}))}
										size='large'
										onChange={onChangeProductSKU}
										disabled={!!discountProgramProductEdit}
									/>
								</Form.Item>
							</MCol>
							{productSelect?.groupOptions?.map((group, index) => (
								<MCol
									span={6}
									key={group?.groupName}
								>
									<Form.Item
										name={'option' + (index + 1)}
										label={group?.groupName}
										rules={[{ required: true }]}
									>
										<MSelect
											placeholder={'Select ' + group?.groupName}
											options={group?.options?.map((c) => ({
												value: JSON.stringify({ [group?.groupName || '']: c }),
												label: c,
											}))}
											size='large'
											onChange={onChangeProductSKUOption}
											disabled={!!discountProgramProductEdit}
										/>
									</Form.Item>
								</MCol>
							))}
						</>
					)}

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
									dispatch(setDiscountProgramProductEdit(null));
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
