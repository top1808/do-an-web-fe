import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MUploadImage from '@/components/MUploadImage';
import { ProductGroupOption } from '@/models/productModels';
import { checkInputMoney, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import { Form, FormInstance, InputNumber } from 'antd';
import React, { useState } from 'react';

interface ListProductOptionProps {
	groupOptions?: ProductGroupOption[];
	form?: FormInstance;
}

const ListProductOption = (props: ListProductOptionProps) => {
	const { groupOptions, form } = props;

	const [priceAll, setPriceAll] = useState<number | null>(null);

	const onApplyAll = () => {
		let productSKU = {};

		if ((groupOptions?.length || 0) > 1) {
			groupOptions?.[0]?.options?.forEach((option) => {
				groupOptions?.[1]?.options?.map((item) => {
					productSKU = {
						...productSKU,
						[JSON.stringify({ [groupOptions[0]?.groupName || 'option1']: option, [groupOptions[1]?.groupName || 'option2']: item })]: priceAll,
					};
				});
			});
		} else {
			groupOptions?.[0]?.options?.forEach((option) => {
				productSKU = {
					...productSKU,
					[JSON.stringify({ [groupOptions[0]?.groupName || 'option1']: option })]: priceAll,
				};
			});
		}
		form?.setFieldsValue({
			...form.getFieldsValue(),
			productSKU,
		});
		setPriceAll(null);
	};

	return (
		<MRow
			gutter={[12, 12]}
			className='items-center'
		>
			<MCol span={4}>
				<MText className='text-base'>List Classification</MText>
			</MCol>
			<MCol span={4}>
				<InputNumber
					placeholder='Enter price...'
					className='w-full'
					formatter={handleFormatterInputNumber}
					parser={handleParserInputNumber}
					maxLength={13}
					step={1000}
					onChange={(value) => setPriceAll(value)}
					value={priceAll}
				/>
			</MCol>
			<MCol span={4}>
				<MButton
					type='primary'
					onClick={onApplyAll}
					disabled={!priceAll || priceAll < 1000}
				>
					Apply All
				</MButton>
			</MCol>
			<MCol
				span={20}
				offset={4}
			>
				<table className='table-border'>
					<thead>
						<tr>
							{groupOptions?.map((item, index) => (
								<th
									className='w-60'
									key={index}
								>
									{item?.groupName || 'Group ' + (index + 1)}
								</th>
							))}
							<th className='w-60'>Giá</th>
							{/* <th className='w-60'>Ảnh</th> */}
						</tr>
					</thead>
					<tbody>
						{(groupOptions?.length || 0) > 0 &&
							groupOptions?.[0]?.options?.map((option, i) => (
								<React.Fragment key={i}>
									<tr>
										<td rowSpan={groupOptions?.[1] ? (groupOptions?.[1]?.options?.length || 0) + 1 : 2}>{option}</td>
									</tr>
									{groupOptions?.[1] ? (
										groupOptions?.[1]?.options?.map((item, index) => (
											<tr key={index}>
												<td>{item}</td>
												<td>
													<Form.Item
														name={['productSKU', JSON.stringify({ [groupOptions[0]?.groupName || 'option1']: option, [groupOptions[1]?.groupName || 'option2']: item })]}
														rules={[{ required: true, validator: (_, value) => checkInputMoney(value) }]}
													>
														<InputNumber
															placeholder='Enter price...'
															className='w-full'
															formatter={handleFormatterInputNumber}
															parser={handleParserInputNumber}
															step={1000}
														/>
													</Form.Item>
												</td>
												{/* <td className='text-center'>
													<MUploadImage
														image=''
														formName={['productSKU', 'image']}
														disableTitle
														notRequired
													/>
												</td> */}
											</tr>
										))
									) : (
										<tr>
											<td>
												<Form.Item
													name={['productSKU', JSON.stringify({ [groupOptions[0]?.groupName || 'option1']: option })]}
													rules={[{ required: true, validator: (_, value) => checkInputMoney(value) }]}
												>
													<InputNumber
														placeholder='Enter price...'
														className='w-full'
														formatter={handleFormatterInputNumber}
														parser={handleParserInputNumber}
														step={1000}
													/>
												</Form.Item>
											</td>
											{/* <td className='text-center'>image</td> */}
										</tr>
									)}
								</React.Fragment>
							))}
					</tbody>
				</table>
			</MCol>
		</MRow>
	);
};

export default ListProductOption;
