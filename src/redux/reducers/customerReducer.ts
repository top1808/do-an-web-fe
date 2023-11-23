import { Customer, CustomerParams } from '@/models/customerModel';
import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface CustomerState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Customer[];
	customerEdit?: Customer | null;
}

const initialState: CustomerState = {
	loading: false,
	status: 'pending',
	data: [],
	customerEdit: null,
};

const customerSlice = createSlice({
	name: 'customer',
	initialState: initialState,
	reducers: {
		gettingCustomers: (state, action: PayloadAction<CustomerParams>) => {
			state.customerEdit = null;
			state.loading = true;
			state.status = 'pending';
		},
		getCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getCustomersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingCustomer: (state, action: PayloadAction<Customer>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createCustomerSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createCustomerFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingCustomer: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteCustomerSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteCustomerFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingCustomerInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.customerEdit = null;
		},
		getCustomerInfoSuccess: (state, action: PayloadAction<Customer>) => {
			state.loading = false;
			state.customerEdit = action.payload;
		},
		getCustomerInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingCustomer: (state, action: PayloadAction<Customer>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editCustomerSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editCustomerFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	createCustomerFailed,
	createCustomerSuccess,
	creatingCustomer,
	deleteCustomerFailed,
	deleteCustomerSuccess,
	deletingCustomer,
	editCustomerFailed,
	editCustomerSuccess,
	edittingCustomer,
	getCustomerInfoFailed,
	getCustomerInfoSuccess,
	getCustomersFailed,
	getCustomersSuccess,
	gettingCustomerInfo,
	gettingCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;
