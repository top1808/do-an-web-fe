import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { Form, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

interface FormAddTextProps {
	name?: string;
	form?: FormInstance;
}

const FormAddText: React.FC<FormAddTextProps> = ({ name, form }) => {
	const [textValue, setTextValue] = useState('');
	const data: string[] = Form.useWatch(name, form);

	const onAddText = () => {
		form?.setFieldsValue({
			...form.getFieldsValue(),
			[name as string]: [...data, textValue],
		});
		setTextValue('');
	};

	const onDeleteItem = (index: number) => {
		const newData = data?.filter((_, i) => i !== index);
		form?.setFieldsValue({
			...form.getFieldsValue(),
			[name as string]: newData,
		});
	};

	return (
		<div className='bg-gray-100 p-4 rounded'>
			<MRow
				align='middle'
				gutter={12}
			>
				<MCol xs={16}>
					<MInput
						size='large'
						maxLength={1000}
						value={textValue}
						onChange={(e) => setTextValue(e.target.value)}
						onKeyDown={(e) => {
							e.key === 'Enter' && onAddText();
						}}
					/>
				</MCol>
				<MCol xs={8}>
					<MButton
						type='primary'
						onClick={onAddText}
					>
						Add
					</MButton>
				</MCol>
				<MCol
					xs={24}
					className='mt-4'
				>
					{data?.map((item: string, index: number) => (
						<div
							key={index}
							className='bg-white p-2 rounded flex items-center justify-between'
						>
							<div>
								<strong>{index + 1}.</strong> &nbsp;
								{item}
							</div>
							<MButtonDelete
								title={`Delete text: ${item}`}
								onConfirm={() => onDeleteItem(index)}
							/>
						</div>
					))}
				</MCol>
			</MRow>
		</div>
	);
};

export default FormAddText;
