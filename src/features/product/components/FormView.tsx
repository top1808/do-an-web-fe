import MButton from '@/components/MButton';
import MCol from '@/components/MCol';

import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import { STATUS_PRODUCT } from '@/constants';
import { Product } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import { htmlToEditor } from '@/utils/FuntionHelpers';

import { Form } from 'antd';
import { useRouter } from 'next-nprogress-bar';

import React, { useEffect } from 'react';

import ProductGroupOptions from './ProductGroupOptions';
import { getProductState } from '@/redux/reducers/productReducer';
import MUploadImageMultiple from '@/components/MUploadImageMultiple';
import { convertToRaw } from 'draft-js';

type ProductFormProps = {
	onSubmit?: (data: Product) => void;
};

const inititalValue: Product = {
	images: [],
	name: '',
	price: 0,
	description: '',
	descriptionDraft: htmlToEditor(''),
	status: 'active',
	groupOptions: [],
};

const FormViewProduct: React.FC<ProductFormProps> = (props) => {
	const product = useAppSelector(getProductState);

	const category = useAppSelector(getCategoryState);
	const { productEdit } = product;
	// console.log('🚀 ~ productEdit:', productEdit);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const { onSubmit } = props;

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(
			productEdit
				? {
						...productEdit,
						imageUploads: productEdit?.images?.map((item, i) => ({
							thumbUrl: item,
							uid: i + '',
							name: item,
						})),
						descriptionDraft: convertToRaw(htmlToEditor(productEdit?.description || '').getCurrentContent()),
				  }
				: inititalValue,
		);

		if (productEdit?.productSKUList) {
			const productSKU = productEdit?.productSKUList?.reduce((acc, item) => {
				const key = { [item?.options?.[0]?.groupName || 'option1']: item?.options?.[0]?.option, [item?.options?.[1]?.groupName || 'option1']: item?.options?.[1]?.option };
				if (!key.option2) delete key.option2;
				acc = { ...acc, [JSON.stringify(key)]: item.price };
				return acc;
			}, {});
			form.setFieldValue('productSKU', productSKU);
		}
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
		<MSkeleton loading={product.isGettingInfo}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
				disabled
			>
				<MRow gutter={12}>
					<MCol span={24}>
						<MUploadImageMultiple
							disabled
							initFileList={productEdit?.images}
						>
							Upload
						</MUploadImageMultiple>
					</MCol>
					<MCol span={24}>
						<MRow gutter={12}>
							<MCol span={12}>
								<Form.Item
									name='name'
									label='Name'
								>
									<MInput
										placeholder='Enter name...'
										size='large'
									/>
								</Form.Item>
							</MCol>

							<MCol span={6}>
								<Form.Item
									name='status'
									label='Status'
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
									name='categoryIds'
									label='Categories'
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

							<MCol span={24}>
								<Form.Item
									name='descriptionDraft'
									label='Description'
								>
									<div
										className='w-full max-h-80 overflow-auto border border-black border-solid p-2 rounded'
										dangerouslySetInnerHTML={{ __html: productEdit?.description as string }}
									></div>
								</Form.Item>
							</MCol>
							<MCol span={24}>
								<ProductGroupOptions form={form} />
							</MCol>
						</MRow>
					</MCol>
				</MRow>
			</Form>

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

export default FormViewProduct;
