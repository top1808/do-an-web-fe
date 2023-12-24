import { Order, OrderParams, OrderProduct, PayloadChangeStatusOrder } from '@/models/orderModel';
import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { Voucher } from '@/models/voucherModel';
import { formatDate, generateCode } from '@/utils/FuntionHelpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const orderInitValue: Order = {
	orderCode: generateCode(),
	customerCode: '',
	customerAddress: '',
	customerPhone: '',
	deliveryAddress: '',
	products: [],
	note: '',
	status: 'confirmed',
	totalProductPrice: 0,
	totalPaid: 0,
	totalPrice: 0,
	paymentMethod: '',
	deliveryDate: '',
	deliveryFee: 30000,
	voucherCode: '',
	voucherDiscount: 0,
	createdAt: formatDate(new Date()),
};

interface OrderState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Order[];
	orderEdit?: Order | null;
	orderPost?: Order | null;
	orderProductEdit?: OrderProduct | null;
	isAddOrderProduct?: boolean;
	isAddOrderShipmentDetail?: boolean;
	isChangingStatus?: boolean;
}

const initialState: OrderState = {
	loading: false,
	status: 'pending',
	data: [],
	orderEdit: null,
	orderPost: orderInitValue,
	orderProductEdit: null,
	isAddOrderProduct: false,
	isAddOrderShipmentDetail: false,
	isChangingStatus: false,
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		addOrderCustomerInfo: (state, action: PayloadAction<Order | null>) => {
			state.orderPost = {
				...state.orderPost,
				...action.payload,
			};
		},

		addOrderProduct: (state, action: PayloadAction<OrderProduct | null>) => {
			const newProducts = [...(state.orderPost?.products as OrderProduct[]), action.payload];
			state.orderPost = {
				...state.orderPost,
				products: newProducts as OrderProduct[],
			};
		},

		deleteOrderProduct: (state, action: PayloadAction<number>) => {
			const newProducts = (state.orderPost?.products as OrderProduct[]).filter((p, i) => i !== action.payload);
			state.orderPost = {
				...state.orderPost,
				products: newProducts as OrderProduct[],
			};
		},

		toggleAddOrderProductPage: (state) => {
			state.isAddOrderProduct = !state.isAddOrderProduct;
			state.isAddOrderShipmentDetail = false;
		},

		toggleAddShipmentDetailPage: (state) => {
			state.isAddOrderProduct = false;
			state.isAddOrderShipmentDetail = !state.isAddOrderShipmentDetail;
			let totalProductPrice = 0;
			state.orderPost?.products?.forEach((p) => {
				totalProductPrice += p.totalPrice || 0;
			});
			state.orderPost = {
				...state.orderPost,
				totalProductPrice: totalProductPrice,
			};
		},

		setOrderProductEdit: (state, action: PayloadAction<OrderProduct | null>) => {
			state.orderProductEdit = action.payload;
		},

		editOrderProductEdit: (state, action: PayloadAction<OrderProduct | null>) => {
			const newProducts = state.orderPost?.products?.map((p) => {
				if (p.productCode === action.payload?.productCode) {
					return action.payload;
				}
				return p;
			});
			state.orderPost = {
				...state.orderPost,
				products: newProducts as OrderProduct[],
			};
			state.orderProductEdit = null;
		},

		setPaidAmount: (state, action: PayloadAction<number>) => {
			const data = state.orderPost;
			state.orderPost = {
				...data,
				totalPaid: action.payload as number,
				totalPrice: (data?.totalProductPrice || 0) + (data?.deliveryFee || 0) - action.payload - (data?.voucherDiscount || 0),
			};
		},

		applyVoucher: (state, action: PayloadAction<Voucher>) => {
			const voucher = action.payload;
			const data = state.orderPost;
			let voucherDiscount = 0;
			if ((voucher?.minOrderValue || 0) > (data?.totalProductPrice || 0)) toast.error('Min Order Value is not enough to use this voucher');
			else {
				if (voucher.type === 'percent') {
					voucherDiscount = ((data?.totalProductPrice || 0) * (voucher?.value || 0)) / 100;
					voucherDiscount = voucherDiscount > (voucher?.maxDiscountValue || 0) ? voucher?.maxDiscountValue || 0 : voucherDiscount;
				} else {
					voucherDiscount = voucher?.value || 0;
				}

				const totalPrice = (data?.totalPrice || 0) - voucherDiscount;

				state.orderPost = {
					...data,
					voucherCode: voucher.code,
					voucherDiscount,
					totalPrice: totalPrice < 0 ? 0 : totalPrice,
				};
			}
		},

		clearVoucher: (state) => {
			const data = state.orderPost;
			state.orderPost = {
				...data,
				voucherCode: '',
				voucherDiscount: 0,
				totalPrice: (data?.totalProductPrice || 0) + (data?.deliveryFee || 0) - (data?.totalPaid || 0),
			};
		},

		gettingOrders: (state, action: PayloadAction<OrderParams>) => {
			state.orderEdit = null;
			state.loading = true;
			state.status = 'pending';
			state.orderEdit = null;
			state.orderPost = orderInitValue;
			state.isAddOrderShipmentDetail = false;
			state.isAddOrderProduct = false;
			state.orderProductEdit = null;
		},
		getOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getOrdersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingOrder: (state, action: PayloadAction<Order>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createOrderSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createOrderFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingOrder: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteOrderSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteOrderFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingOrderInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.orderEdit = null;
			state.orderPost = null;
		},
		getOrderInfoSuccess: (state, action: PayloadAction<Order>) => {
			state.loading = false;
			state.orderEdit = action.payload;
			state.orderPost = action.payload;
		},
		getOrderInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingOrder: (state, action: PayloadAction<Order>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editOrderSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editOrderFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		changingStatusOrder: (state, action: PayloadAction<PayloadChangeStatusOrder>) => {
			state.isChangingStatus = true;
		},
		changeStatusOrderSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.isChangingStatus = false;
			action.payload && toast.success(action.payload.message);
		},
		changeStatusOrderFailed: (state, action: PayloadAction<string>) => {
			state.isChangingStatus = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	createOrderFailed,
	createOrderSuccess,
	creatingOrder,
	addOrderCustomerInfo,
	addOrderProduct,
	deleteOrderProduct,
	toggleAddOrderProductPage,
	toggleAddShipmentDetailPage,
	setOrderProductEdit,
	editOrderProductEdit,
	setPaidAmount,
	deleteOrderFailed,
	deleteOrderSuccess,
	deletingOrder,
	editOrderFailed,
	editOrderSuccess,
	edittingOrder,
	getOrderInfoFailed,
	getOrderInfoSuccess,
	getOrdersFailed,
	getOrdersSuccess,
	gettingOrderInfo,
	gettingOrders,
	applyVoucher,
	clearVoucher,
	changingStatusOrder,
	changeStatusOrderFailed,
	changeStatusOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
