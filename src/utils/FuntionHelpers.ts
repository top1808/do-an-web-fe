import { MenuItem } from '@/models/productModels';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import { ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { RawDraftContentState } from 'react-draft-wysiwyg';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export const vietnamesePhoneNumberRegex = /(0|\+84)(\d{9})\b/;

export const editorToHtml = (rawContentState: RawDraftContentState | null) => {
	if (!rawContentState) return '';
	return draftToHtml(rawContentState);
};

export const htmlToEditor = (html: string) => {
	if (!html) return EditorState.createEmpty();
	const blocksFromHtml = htmlToDraft(html);
	const { contentBlocks, entityMap } = blocksFromHtml;
	const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
	return EditorState.createWithContent(contentState);
};

export const customMoney = (money: number) => {
	return (money || 0).toLocaleString('vi-VN', {
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

export const objectToQueryString = <T>(object: T): string => {
	return '?' + new URLSearchParams(object as any).toString();
};

export const formatDate = (date?: Date | string, format?: string) => {
	return dayjs(date || new Date()).format(format || 'YYYY-MM-DD');
};

export const changeDateStringToDayjs = (date: string | Date) => {
	return dayjs(date || new Date());
};

export const formatPhonenumber = (phoneNumber: string) => {
	return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

export const checkPhoneNumber = (phoneNumber: string) => {
	if (!vietnamesePhoneNumberRegex.test(phoneNumber)) {
		return Promise.reject('Please enter a valid phone number');
	}
	return Promise.resolve();
};

export const generateCode = () => {
	return Math.floor(Math.random() * Math.pow(10, 21)).toString();
};

export const generateVoucherCode = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < 8; i++) {
		randomString += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return randomString;
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
