import { Category } from '@/models/categoryModels';
import { MenuItem } from '@/models/productModels';

export const customMoney = (money: number) => {
	return money.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};

export function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}
