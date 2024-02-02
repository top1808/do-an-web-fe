import { MenuProps } from 'antd';
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
	image?: string;
	name?: string;
	price?: number;
	quantity?: number;
	category_id?: string[];
	description?: string;
	descriptionDraft?: RawDraftContentState | EditorState | null;
	status?: string;
}

export interface ProductParams {
	offset?: string;
	limit?: string;
}

export type MenuItem = Required<MenuProps>['items'][number];
