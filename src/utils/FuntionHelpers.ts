import { MenuItem } from '@/models/productModels';

export const customMoney = (money: number) => {
	return money.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};

export const customNumber = (number: number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const compareAlphabet = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
	return array.sort((a, b) => (direction === 'asc' ? String(a[key]).localeCompare(String(b[key])) : String(b[key]).localeCompare(String(a[key]))));
};

export const handleFormatterInputNumber = (value: number | undefined) => {
	if (value !== undefined) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}
	return '1';
};

export const handleParserInputNumber = (value: string | undefined) => {
	if (value !== undefined) {
		return Number(value.replace(/\./g, ''));
	}
	return 1;
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
