import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { Product } from '@/models/productModels';

import { Form, InputNumber, Radio } from 'antd';
import { usePathname } from 'next/navigation';
import React from 'react';

type ProductFormProps = {
	onSubmit?: (data: Product) => void;
};

const inititalValue: Product = {
	name: '',
	price: 0,
	decription: '',
	quantity: 0,
	status: true,
};

const FormCreateProduct: React.FC<ProductFormProps> = (props) => {
	const { onSubmit } = props;
	const pathname = usePathname();

	return (
		<Form
			onFinish={onSubmit}
			layout='vertical'
			initialValues={inititalValue}
		>
			<MRow gutter={12}>
				<MCol span={4}>
					<Form.Item
						name='name'
						label='Product Name'
						rules={[{ required: true }]}
					>
						<MInput
							placeholder='Enter Product name...'
							size='large'
						/>
					</Form.Item>
				</MCol>
				<MCol span={4}>
					<Form.Item
						name='price'
						label='Price'
						rules={[{ required: true }]}
					>
						<InputNumber
							placeholder='Enter price...'
							className='w-full'
							size='large'
						/>
					</Form.Item>
				</MCol>
				<MCol span={2}>
					<Form.Item
						name='quantity'
						label='Quantity'
						rules={[{ required: true }]}
					>
						<InputNumber
							placeholder='Enter quatity...'
							size='large'
							className='w-full'
						/>
					</Form.Item>
				</MCol>
				<MCol span={9}>
					<Form.Item
						name='description'
						label='Description'
						rules={[{ required: true }]}
					>
						<MInput
							placeholder='Enter description...'
							size='large'
						/>
					</Form.Item>
				</MCol>
				<MCol span={4}>
					<Form.Item
						name='status'
						label='Status'
						rules={[{ required: true }]}
					>
						<Radio.Group defaultValue={true}>
							<Radio.Button value={true}>True</Radio.Button>
							<Radio.Button value={false}>False</Radio.Button>
						</Radio.Group>
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
						link='/admin/product'
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
	);
};

export default FormCreateProduct;
