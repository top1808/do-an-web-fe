import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
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
	status: true,
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
						label='Category Name'
						rules={[{ required: true }]}
					>
						<MInput
							placeholder='Enter Category name...'
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
						<Input
							placeholder='Enter type...'
							size='large'
						/>
					</Form.Item>
				</MCol>
				<MCol span={6}>
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
				<MCol span={6}>
					<Form.Item
						name='status'
						label='Status'
						rules={[{ required: true }]}
					>
						<Radio.Group defaultValue={true}>
							<Radio.Button value={true}> True</Radio.Button>
							<Radio.Button value={false}> False</Radio.Button>
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
						link='/admin/category'
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
