import React from 'react';
import MButton from '@/components/MButton';
import MText from '@/components/MText';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MCard from '@/components/MCard';
import { Form, FormInstance, InputNumber } from 'antd';
import { checkInputMoney, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';
import MInput from '@/components/MInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductGroupOption } from '@/models/productModels';
import ListProductOption from './ListProductOption';

interface ProductGroupOptionsProps {
	form?: FormInstance;
}

const ProductGroupOptions = (props: ProductGroupOptionsProps) => {
	const { form } = props;
	const groupOptions: ProductGroupOption[] = Form.useWatch('groupOptions', form);

	return (
		<MCard title='Sales Information'>
			<MRow gutter={[12, 12]}>
				<MCol span={24}>
					<MRow gutter={[12, 12]}>
						<MCol span={4}>
							<MText className='text-base'>Classification</MText>
						</MCol>
						<MCol span={20}>
							<Form.List
								name='groupOptions'
								initialValue={[{ groupName: 'group', options: [''] }]}
							>
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, ...restField }) => (
											<div
												className='bg-slate-100 p-2 rounded mb-2'
												key={key}
											>
												<MRow gutter={[12, 12]}>
													<MCol span={8}>
														<Form.Item
															{...restField}
															name={[name, 'groupName']}
															label='Group Name'
															rules={[
																{ required: true, message: 'Group name is not null' },
																{
																	validator(_, value) {
																		if (value && groupOptions.filter((d) => d.groupName === value).length !== 1) {
																			return Promise.reject(new Error('Duplicate values are not allowed.'));
																		} else {
																			return Promise.resolve();
																		}
																	},
																},
															]}
														>
															<MInput
																placeholder='Enter Group Name'
																maxLength={20}
															/>
														</Form.Item>
													</MCol>
													<MCol
														span={2}
														offset={14}
														className='text-end'
													>
														<MButton
															type='text'
															onClick={() => remove(name)}
														>
															<FontAwesomeIcon
																icon={faXmark}
																className='text-lg'
															/>
														</MButton>
													</MCol>
													<MCol span={24}>
														<MRow gutter={12}>
															<MCol span={2}>Options</MCol>
															<MCol span={22}>
																<Form.List
																	name={[name, 'options']}
																	initialValue={['']} // Set initial value for options
																>
																	{(fields, { add, remove }) => (
																		<MRow gutter={[12, 12]}>
																			{fields.map(({ key, name: name1, ...restField }) => (
																				<React.Fragment key={key}>
																					<MCol span={6}>
																						<Form.Item
																							{...restField}
																							name={[name1]}
																							rules={[
																								{ required: true, message: 'Option is not null' },
																								({ getFieldValue }) => ({
																									validator(_, value) {
																										const values: string[] = getFieldValue(['groupOptions', name, 'options']);
																										if (value && values.filter((d) => d === value).length !== 1) {
																											return Promise.reject(new Error('Duplicate values are not allowed.'));
																										} else {
																											return Promise.resolve();
																										}
																									},
																								}),
																							]}
																						>
																							<MInput
																								placeholder='Enter Option'
																								maxLength={20}
																							/>
																						</Form.Item>
																					</MCol>
																					{fields?.length > 1 && (
																						<MCol span={2}>
																							<MButton
																								type='text'
																								onClick={() => remove(name1)}
																								className='px-1'
																							>
																								<FontAwesomeIcon
																									icon={faTrash}
																									className='text-gray-400'
																								/>
																							</MButton>
																						</MCol>
																					)}
																				</React.Fragment>
																			))}
																			<Form.Item>
																				<MButton
																					type='dashed'
																					onClick={() => {
																						add();
																					}}
																					icon={<FontAwesomeIcon icon={faPlus} />}
																					className='text-blue-500 border-blue-500'
																				>
																					Add Option
																				</MButton>
																			</Form.Item>
																		</MRow>
																	)}
																</Form.List>
															</MCol>
														</MRow>
													</MCol>
												</MRow>
											</div>
										))}
										{fields?.length < 2 && (
											<Form.Item>
												<MButton
													type='dashed'
													onClick={() => {
														add();
													}}
													icon={<FontAwesomeIcon icon={faPlus} />}
													className='text-blue-500 border-blue-500'
												>
													Add Group
												</MButton>
											</Form.Item>
										)}
									</>
								)}
							</Form.List>
						</MCol>
					</MRow>
				</MCol>
				{(groupOptions?.length || 0) > 0 ? (
					<MCol span={24}>
						<ListProductOption
							groupOptions={groupOptions}
							form={form}
						/>
					</MCol>
				) : (
					<MCol span={6}>
						<Form.Item
							name='price'
							label='Price'
							rules={[{ required: true, validator: (_, value) => checkInputMoney(value) }]}
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
				)}
			</MRow>
		</MCard>
	);
};

export default ProductGroupOptions;
