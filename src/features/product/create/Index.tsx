'use client';
import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import FormCreateProduct from '../components/FormCreateProduct';
import { creatingProduct } from '@/redux/reducers/productReducer';
import { Product } from '@/models/productModels';
import { editorToHtml } from '@/utils/FuntionHelpers';
import { RawDraftContentState } from 'draft-js';

const CreateProductComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Product) => {
		data.images = data.imageUploads?.map((item) => item.thumbUrl || '');
		data.description = editorToHtml(data.descriptionDraft as RawDraftContentState);
		delete data.descriptionDraft;
		delete data.imageUploads;
		dispatch(creatingProduct(data));
	};

	return (
		<div>
			<FormCreateProduct onSubmit={onSubmit} />
		</div>
	);
};

export default CreateProductComponent;
