import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MSkeleton from '@/components/MSkeleton';
import MUploadImage from '@/components/MUploadImage';
import { CATEGORY_TYPE, STATUS_PRODUCT } from '@/constants';
import { Category } from '@/models/categoryModels';
import { useAppSelector } from '@/redux/hooks';
import { Form, Input } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type CategoryFormProps = {
	onSubmit?: (data: Category) => void;
};

const inititalValue: Category = {
	image: '',
	name: '',
	description: '',
	status: 'active',
};

const FormCreateCategory: React.FC<CategoryFormProps> = (props) => {
	const { category } = useAppSelector((state) => state);
	const { categoryEdit } = category;

	const router = useRouter();

	const { onSubmit } = props;
	const pathname = usePathname();

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(categoryEdit ? categoryEdit : inititalValue);
	}, [form, categoryEdit]);

	useEffect(() => {
		if (category.status === 'completed') {
			router.push('/category');
		}
	}, [category.status, router]);

	return (
		<MSkeleton loading={category.loading}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={12}>
					<MCol span={3}>
						<MUploadImage
							image={categoryEdit?.image || ''}
							formName='image'
						/>
					</MCol>
					<MCol span={21}>
						<MRow gutter={12}>
							<MCol span={6}>
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
					</MCol>
				</MRow>
			</Form>
		</MSkeleton>
	);
};

export default FormCreateCategory;
