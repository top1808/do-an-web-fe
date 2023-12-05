import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { Voucher, VoucherParams } from '@/models/voucherModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface VoucherState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Voucher[];
	voucherEdit?: Voucher | null;
}

const initialState: VoucherState = {
	loading: false,
	status: 'pending',
	data: [],
	voucherEdit: null,
};

const voucherSlice = createSlice({
	name: 'voucher',
	initialState: initialState,
	reducers: {
		gettingVouchers: (state, action: PayloadAction<VoucherParams>) => {
			state.voucherEdit = null;
			state.loading = true;
			state.status = 'pending';
		},
		getVouchersSuccess: (state, action: PayloadAction<Voucher[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getVouchersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingVoucher: (state, action: PayloadAction<Voucher>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createVoucherSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createVoucherFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingVoucher: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteVoucherSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteVoucherFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingVoucherInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.voucherEdit = null;
		},
		getVoucherInfoSuccess: (state, action: PayloadAction<Voucher>) => {
			state.loading = false;
			state.voucherEdit = action.payload;
		},
		getVoucherInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingVoucher: (state, action: PayloadAction<Voucher>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editVoucherSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editVoucherFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	createVoucherFailed,
	createVoucherSuccess,
	creatingVoucher,
	deleteVoucherFailed,
	deleteVoucherSuccess,
	deletingVoucher,
	editVoucherFailed,
	editVoucherSuccess,
	edittingVoucher,
	getVoucherInfoFailed,
	getVoucherInfoSuccess,
	getVouchersFailed,
	getVouchersSuccess,
	gettingVoucherInfo,
	gettingVouchers,
} = voucherSlice.actions;
export default voucherSlice.reducer;
