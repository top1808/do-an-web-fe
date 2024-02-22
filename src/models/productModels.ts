import { MenuProps, UploadFile } from 'antd';
import { EditorState, RawDraftContentState } from 'draft-js';

export interface InforProduct {
	id: string;
	name: string;
	image: string;
	price: number;
	isFlashSale: boolean;
	countHeart: number;
}

export interface Product {
	_id?: string;
	images?: string[];
	imageUploads?: UploadFile[];
	name?: string;
	minPrice?: number;
	maxPrice?: number;
	price?: number;
	quantity?: number;
	category_id?: string[];
	description?: string;
	descriptionDraft?: RawDraftContentState | EditorState | null;
	status?: string;
	groupOptions?: ProductGroupOption[];
	productSKUList?: ProductSKU[];
}

export interface ProductSKU extends Product {
	barcode?: string;
	image?: string;
	option1?: string;
	option2?: string;
	price?: number;
	productId?: string;
}

export interface ProductGroupOption {
	groupName?: string;
	options?: string[];
	initPrice?: number;
}

export interface OptionDetail {
	optionName?: string;
	price?: number;
}

export interface ProductParams {
	offset?: string;
	limit?: string;
}

export type MenuItem = Required<MenuProps>['items'][number];
