import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { OrderProduct } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addOrderProduct, editOrderProductEdit, setOrderProductEdit, toggleAddOrderProductPage, toggleAddShipmentDetailPage } from '@/redux/reducers/orderReducer';
import { gettingAllProduct, gettingProduct } from '@/redux/reducers/productReducer';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import TableOrderProduct from './TableOrderProduct';
import MSkeleton from '@/components/MSkeleton';

interface FormAddProductProps {}

const FormAddProduct: React.FC<FormAddProductProps> = (props) => {
	const { product, order } = useAppSelector((state) => state);

	const { orderProductEdit } = order;

	const dispatch = useAppDispatch();

	const [form] = Form.useForm<OrderProduct>();

	const onResetForm = () => {
		form.resetFields();
	};

	const onSubmit = (data: OrderProduct) => {
		data.totalPrice = (data.price || 0) * (data.quantity || 0);
		if (!orderProductEdit) {
			dispatch(addOrderProduct(data));
			toast.success('Add Product Success');
		} else {
			dispatch(editOrderProductEdit(data));
			toast.success('Update Product Success');
		}
		onResetForm();
	};

	const onChangeProduct = (id?: string) => {
		const productSelected = product.data?.find((c) => c._id === id);
		if (productSelected) {
			form.setFieldsValue({
				productName: productSelected?.name,
				productCode: productSelected?._id,
				productQuantity: productSelected?.quantity,
				price: productSelected?.price,
			});
		}
	};

	useEffect(() => {
		if (orderProductEdit) {
			form.setFieldsValue(orderProductEdit);
			onChangeProduct(orderProductEdit?.productCode);
		}
	}, [form, orderProductEdit]);

	useEffect(() => {
		dispatch(gettingAllProduct());
	}, [dispatch]);

	return (
		<MSkeleton loading={product.loading}>
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
									disabled={!!orderProductEdit}
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
									disabled={!!orderProductEdit}
								/>
							</Form.Item>
						</MCol>

						<MCol span={6}>
							<Form.Item
								name='price'
								label='Product Price'
								rules={[{ required: true }]}
							>
								<InputNumber
									placeholder='Enter price...'
									className='w-full'
									size='large'
									formatter={handleFormatterInputNumber}
									parser={handleParserInputNumber}
								/>
							</Form.Item>
						</MCol>
						<MCol span={6}>
							<Form.Item
								name='quantity'
								label='Quantity'
								rules={[{ required: true }, { type: 'number', min: 1 }]}
							>
								<InputNumber
									placeholder='Enter quantity...'
									className='w-full'
									size='large'
									formatter={handleFormatterInputNumber}
									parser={handleParserInputNumber}
									maxLength={4}
								/>
							</Form.Item>
						</MCol>
					</MRow>
					<MRow
						gutter={8}
						justify='end'
					>
						{orderProductEdit ? (
							<MCol>
								<MButton
									type='primary'
									className='bg-red-500'
									onClick={() => {
										dispatch(setOrderProductEdit(null));
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
								{orderProductEdit ? 'Update' : 'Add'}
							</MButton>
						</MCol>
					</MRow>
				</Form>
				<TableOrderProduct />
				<MRow
					gutter={8}
					justify='end'
					className='mt-2'
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
							onClick={() => dispatch(toggleAddShipmentDetailPage())}
						>
							Next
						</MButton>
					</MCol>
				</MRow>
			</MCard>
		</MSkeleton>
	);
};

export default FormAddProduct;
