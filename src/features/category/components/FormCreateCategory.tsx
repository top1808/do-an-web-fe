import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { CATEGORY_TYPE, STATUS_PRODUCT } from '@/constants';
import { Category } from '@/models/categoryModels';
import { Form, Input, Radio } from 'antd';
import { usePathname } from 'next/navigation';
import React from 'react';

type CategoryFormProps = {
	onSubmit?: (data: Category) => void;
};

const inititalValue: Category = {
	name: '',
	type: '',
	description: '',
	status: 'active',
};

const FormCreateCategory: React.FC<CategoryFormProps> = (props) => {
	const { onSubmit } = props;
	const pathname = usePathname();

	return (
		<Form
			onFinish={onSubmit}
			layout='vertical'
			initialValues={inititalValue}
		>
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
						name='type'
						label='Type'
						rules={[{ required: true }]}
					>
						<MSelect
							placeholder='Select type'
							options={CATEGORY_TYPE}
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
		</Form>
	);
};

export default FormCreateCategory;
