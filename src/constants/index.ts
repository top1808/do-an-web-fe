const CATEGORY_TYPE = [
	{
		label: 'Drink',
		value: 'drink',
	},
	{
		label: 'Food',
		value: 'food',
	},
];

const STATUS_PRODUCT = [
	{
		label: 'Active',
		value: 'active',
	},
	{
		label: 'Disable',
		value: 'disable',
	},
];

const STATUS_VOUCHER = [
	{
		label: 'Active',
		value: 'active',
	},
	{
		label: 'Disable',
		value: 'disable',
	},
];

const PAYMENT_METHOD = [
	{
		label: 'Cash',
		value: 'cash',
	},
	{
		label: 'Transfer',
		value: 'transfer',
	},
];

const TYPE_VOUCHER = [
	{
		label: '%',
		value: 'percent',
	},
	{
		label: 'Price',
		value: 'price',
	},
];

const ORDER_STATUS = [
	{
		label: 'Đang xử lý',
		value: 'processing',
		color: 'yellow',
	},
	{
		label: 'Đã xác nhận',
		value: 'confirmed',
		color: 'green',
	},
	{
		label: 'Đang giao hàng',
		value: 'delivering',
		color: 'geekblue',
	},
	{
		label: 'Đã giao hàng',
		value: 'delivered',
		color: 'orange',
	},
	{
		label: 'Đã nhận hàng',
		value: 'received',
		color: 'pink',
	},
	{
		label: 'Đã hủy',
		value: 'canceled',
		color: 'red',
	},
];

const firebaseConfig = {
	apiKey: 'AIzaSyB64kFtwaXYBwjh13h0YgRHKlufJsPPRHc',
	authDomain: 'do-an-web-7e477.firebaseapp.com',
	databaseURL: 'https://do-an-web-7e477-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'do-an-web-7e477',
	storageBucket: 'do-an-web-7e477.appspot.com',
	messagingSenderId: '542018707616',
	appId: '1:542018707616:web:31bfafc0fe1e7b826629c5',
	measurementId: 'G-D2RCS7H75K',
};

export { CATEGORY_TYPE, STATUS_PRODUCT, STATUS_VOUCHER, PAYMENT_METHOD, TYPE_VOUCHER, ORDER_STATUS, firebaseConfig };
