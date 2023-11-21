import { Product } from '@/models/productModels';
import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface ProductState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Product[];
	productEdit?: Product | null;
}

const initialState: ProductState = {
	loading: false,
	status: 'pending',
	data: [],
	productEdit: null,
};

const ProductSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		gettingProduct: (state) => {
			state.status = 'pending';
			state.loading = true;
			state.productEdit = null;
		},
		getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getProductsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingProduct: (state, action: PayloadAction<Product>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createProductSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createProductFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingProduct: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteProductSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteProductFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingProductInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.productEdit = null;
		},
		getProductInfoSuccess: (state, action: PayloadAction<Product>) => {
			state.loading = false;
			state.productEdit = action.payload;
		},
		getProductInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingProduct: (state, action: PayloadAction<Product>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editProductSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editProductFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	editProductFailed,
	editProductSuccess,
	edittingProduct,
	getProductInfoFailed,
	getProductInfoSuccess,
	gettingProductInfo,
	createProductFailed,
	createProductSuccess,
	creatingProduct,
	deleteProductFailed,
	deleteProductSuccess,
	deletingProduct,
	gettingProduct,
	getProductsFailed,
	getProductsSuccess,
} = ProductSlice.actions;
export default ProductSlice.reducer;
