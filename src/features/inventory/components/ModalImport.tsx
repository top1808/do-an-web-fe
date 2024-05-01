import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MInputNumber from '@/components/MInputNumber';
import MRow from '@/components/MRow';
import { HistoryImport } from '@/models/inventoryModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInventoryState, importingInventory } from '@/redux/reducers/inventoryReducer';
import { getModalState, toggleModalImportInventory } from '@/redux/reducers/modalReducer';
import { Form, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

const ModalImport = () => {
	const modal = useAppSelector(getModalState);
	const inventory = useAppSelector(getInventoryState);

	const dispatch = useAppDispatch();

	const btnSubmitRef = useRef<HTMLButtonElement | null>(null);

	const { productImport } = modal;

	const [form] = Form.useForm();

	const onSubmit = (data: HistoryImport) => {
		const body: HistoryImport = {
			...data,
			productCode: productImport?.product?._id,
			productSKUBarcode: productImport?.productSKU?.barcode,
			inventoryId: productImport?._id,
		};
		dispatch(importingInventory(body));
		dispatch(toggleModalImportInventory(null));
	};

	useEffect(() => {
		if (!modal.isOpen) {
			form.resetFields();
		} else {
			form.setFieldsValue({
				productName: productImport?.product?.name,
				option1: productImport?.productSKU?.options?.[0] ? `${productImport?.productSKU?.options?.[0]?.groupName}: ${productImport?.productSKU?.options?.[0]?.option}` : '',
				option2: productImport?.productSKU?.options?.[1] ? `${productImport?.productSKU?.options?.[1]?.groupName}: ${productImport?.productSKU?.options?.[1]?.option}` : '',
				priceImport: null,
				quantityImport: null,
			});
		}
	}, [form, modal.isOpen, productImport]);

	return (
		<Modal
			title='Import Inventory'
			open={modal.isOpen}
			okText='Import'
			onCancel={() => dispatch(toggleModalImportInventory(null))}
			onOk={() => btnSubmitRef.current?.click()}
			confirmLoading={inventory.isImporting}
			forceRender
		>
			<div className='text-xl text-center my-2'>
				{productImport?.product?.name} - {productImport?.productSKU?.options?.[0] ? `${productImport?.productSKU?.options?.[0]?.groupName}: ${productImport?.productSKU?.options?.[0]?.option}` : ''}
				{productImport?.productSKU?.options?.[1] ? `, ${productImport?.productSKU?.options?.[1]?.groupName}: ${productImport?.productSKU?.options?.[1]?.option}` : ''}
			</div>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
			>
				<MRow gutter={4}>
					<MCol span={24}>
						<Form.Item
							name='quantityImport'
							label='Quantity Import'
							rules={[{ required: true, type: 'number', min: 1, message: 'Please enter quantity' }]}
						>
							<MInputNumber
								className='w-full'
								size='large'
							/>
						</Form.Item>
					</MCol>
					<MCol span={24}>
						<Form.Item
							name='priceImport'
							label='Price Import'
							rules={[{ required: true, type: 'number', min: 1000, message: 'Please enter price > 1000' }]}
						>
							<MInputNumber
								className='w-full'
								size='large'
								step={1000}
							/>
						</Form.Item>
					</MCol>
				</MRow>
				<button
					type='submit'
					hidden
					ref={btnSubmitRef}
				></button>
			</Form>
		</Modal>
	);
};

export default ModalImport;
