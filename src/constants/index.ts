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

const STATUS_ORDER = [
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

export { CATEGORY_TYPE, STATUS_PRODUCT, STATUS_ORDER, PAYMENT_METHOD, TYPE_VOUCHER, ORDER_STATUS };
