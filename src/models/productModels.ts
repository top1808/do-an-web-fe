import { MenuProps } from 'antd';

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
	name?: string;
	price?: number;
	quantity?: number;
	category_id?: string[];
	decription?: string;
	status?: boolean;
}
export type MenuItem = Required<MenuProps>['items'][number];
