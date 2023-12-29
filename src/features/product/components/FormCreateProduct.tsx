import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { STATUS_PRODUCT } from '@/constants';
import { Product } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';

import { Form, Input, InputNumber } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type ProductFormProps = {
	onSubmit?: (data: Product) => void;
};

const inititalValue: Product = {
	image: '',
	name: '',
	price: 0,
	decription: '',
	status: 'active',
};

const FormCreateProduct: React.FC<ProductFormProps> = (props) => {
	const { product, category } = useAppSelector((state) => state);
	const { productEdit } = product;

	const dispatch = useAppDispatch();

	const router = useRouter();

	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(productEdit ? productEdit : inititalValue);
	}, [form, productEdit]);

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	useEffect(() => {
		if (product.status === 'completed') {
			router.push('/product');
		}
	}, [product.status, router]);

	return (
		<MSkeleton loading={product.loading}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={12}>
					<MCol span={3}>
						<MForm.UploadImage
							formLabel='Image'
							formName='image'
							name='image'
							action={`${process.env.API_UPLOAD_URL}image/upload`}
							accept='image/*'
							listType='picture-card'
							multiple={false}
							initImage={productEdit?.image}
							showUploadList={false}
						>
							Upload
						</MForm.UploadImage>
					</MCol>
					<MCol span={21}>
						<MRow gutter={12}>
							<MCol span={12}>
								<Form.Item
									name='name'
									label='Name'
									rules={[{ required: true }]}
								>
									<MInput
										placeholder='Enter name...'
										size='large'
									/>
								</Form.Item>
							</MCol>

							<MCol span={12}>
								<Form.Item
									name='categoryIds'
									label='Categories'
									rules={[{ required: true }]}
								>
									<MSelect
										size='large'
										mode='multiple'
										placeholder='Select Categories'
										className='w-full'
										options={category.data?.map((c) => ({
											value: c._id,
											label: c.name,
										}))}
									/>
								</Form.Item>
							</MCol>

							<MCol span={6}>
								<Form.Item
									name='price'
									label='Price'
									rules={[{ required: true }]}
								>
									<InputNumber
										placeholder='Enter price...'
										className='w-full'
										size='large'
										formatter={handleFormatterInputNumber}
										parser={handleParserInputNumber}
										step={1000}
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
										placeholder='Select type'
										options={STATUS_PRODUCT}
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

export default FormCreateProduct;
