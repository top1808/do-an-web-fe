import { Product, ProductGroupOption, ProductParams } from '@/models/productModels';
import { PaginationModel, ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';

interface ProductState {
	loading: boolean;
	isGettingInfo: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Product[];
	pagination?: PaginationModel;
	productEdit?: Product | null;
	productDataPost?: Product;
}

const initialState: ProductState = {
	loading: false,
	isGettingInfo: false,
	status: 'pending',
	data: [],
	productEdit: null,
	pagination: {
		total: 0,
		offset: 0,
		limit: 10,
		page: 1,
	},
	productDataPost: {
		images: [],
		name: '',
		price: 0,
		category_id: [],
		description: '',
		descriptionDraft: null,
		status: 'active',
		groupOptions: [],
		productSKU: [],
	},
};

const ProductSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		gettingProduct: (state, action: PayloadAction<ProductParams | null>) => {
			state.status = 'pending';
			state.loading = true;
			state.productEdit = null;
		},
		getProductsSuccess: (state, action: PayloadAction<{ products?: Product[]; pagination?: PaginationModel }>) => {
			state.loading = false;
			state.data = action.payload.products;
			state.pagination = action.payload.pagination;
		},
		getProductsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		gettingAllProduct: (state) => {
			state.status = 'pending';
			state.loading = true;
			state.productEdit = null;
		},
		getAllProductSuccess: (state, action: PayloadAction<{ products?: Product[] }>) => {
			state.loading = false;
			state.data = action.payload.products;
		},
		getAllProductFailed: (state, action: PayloadAction<string>) => {
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
			state.isGettingInfo = true;
			state.productEdit = null;
		},
		getProductInfoSuccess: (state, action: PayloadAction<Product>) => {
			state.isGettingInfo = false;
			state.productEdit = action.payload;
		},
		getProductInfoFailed: (state, action: PayloadAction<string>) => {
			state.isGettingInfo = false;
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

		setProductDataPost: (state, action: PayloadAction<Product>) => {
			let newState = { ...state.productDataPost, ...action.payload };
			newState = {
				...newState,
				groupOptions: newState?.groupOptions?.map((group) => ({
					...group,
					options: group?.options?.[group?.options?.length - 1]?.trim() !== '' ? [...(group?.options || []), ''] : group?.options,
				})),
			};
			state.productDataPost = newState;
		},
		addGroupOption: (state) => {
			const groupOption = {
				groupName: '',
				options: [''],
			};
			state.productDataPost = { ...state.productDataPost, groupOptions: [...(state.productDataPost?.groupOptions || []), groupOption] };
		},
	},
});

export const {
	addGroupOption,
	setProductDataPost,
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
	getAllProductFailed,
	getAllProductSuccess,
	gettingAllProduct,
} = ProductSlice.actions;
export const getProductState = (state: RootState) => state.product;
export default ProductSlice.reducer;
