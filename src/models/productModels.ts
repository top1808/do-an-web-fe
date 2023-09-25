import { MenuProps } from 'antd';
import React from 'react';

export interface InforProduct {
	id: string;
	name: string;
	image: string;
	price: number;
	isFlashSale: boolean;
}
export interface Category {
	label: string;
	key: string;
	icon?: React.ReactNode;
	children?: Category[];
}
export type MenuItem = Required<MenuProps>['items'][number];
